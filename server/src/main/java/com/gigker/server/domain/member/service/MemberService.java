package com.gigker.server.domain.member.service;

import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.entity.Profile;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.repository.ProfileRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import com.gigker.server.global.s3.service.S3Service;
import com.gigker.server.global.security.utils.CustomAuthorityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    @Autowired
    private S3Service s3Service;

    public MemberService(MemberRepository memberRepository,
                         ProfileRepository profileRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    //회원가입
    public Member saveMember(Member member, Profile profile, MultipartFile image) throws IOException {
        verifyMemberByEmail(member.getEmail());
        verifyMemberByNickName(member.getNickName());

        String encryptedPassword = passwordEncoder.encode(member.getPassword()); //패스워드 암호화
        List<String> roles = authorityUtils.createRoles(member.getEmail()); //권한 추가

        member.setPassword(encryptedPassword);  //암호화된 비밀번호저장
        member.setRoles(roles); //권한 저장


        profileRepository.save(profile);    //member회원가입시 프로필 정보 db 생성

        if(!image.isEmpty()){   //이미지 파일이 들어있으면 S3에 파일저장하고 Member객체에 URl변환하여 넣어줌.
            String imgUrl = s3Service.imgUpload(image);
            member.setPictureUrl(imgUrl);
        }

        member.addProfile(profile);         //member에 해당profile add
        return memberRepository.save(member);
    }

    //회원 정보 수정(닉네임,자기소개,이미지)
    public Member updateMember(Member member,MultipartFile image) throws IOException{
        Member findMember = findMemberById(member.getMemberId());

        //현재사용자가 작성자인지 체크 아니라면 예외처리
        if(getCurrentMember().getMemberId() != findMember.getMemberId())    {
            throw new BusinessLogicException(ExceptionCode.EDIT_NOT_ALLOWED);
        }

        //이미지 파일이 존재하면 원래있던 파일 삭제후 재생성
        if(!image.isEmpty()){
            String imgUrl = s3Service.imgUpdate(image,findMemberByImgName(findMember));
            findMember.setPictureUrl(imgUrl);
        }

        Optional.ofNullable(member.getNickName())
                .ifPresent(findMember::setNickName);
        Optional.ofNullable(member.getAbout())
                .ifPresent(findMember::setAbout);

        return memberRepository.save(findMember);
    }

    //회원 조회
    @Transactional(readOnly = true)
    public Member findMemberById(Long memberId)
    {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_MEMBER));
    }

    //전체 회원 조회
    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size)
    {
        return memberRepository.findAll(
                PageRequest.of(page,size, Sort.by("memberId").descending()));
    }

    //회원 삭제
    public void deleteMember(Long memberId)
    {
        Member findmember = findMemberById(memberId);

        if(getCurrentMember().getMemberId() != findmember.getMemberId())
            throw new BusinessLogicException(ExceptionCode.DELETE_NOT_ALLOWED);

        findmember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(findmember);
    }


    //현재 로그인한 멤버 조회
    public Member getCurrentMember(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null ||
        authentication.getName().equals("anoymousUser"))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);

        Optional<Member> optionalMember = memberRepository.findByEmail(authentication.getName());
            Member member = optionalMember.orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.NOT_FOUND_MEMBER));

        System.out.println("현재 사용자:"+member.getMemberId());

        return member;
    }


    //이메일 중복 검사
    @Transactional(readOnly = true)
    private void verifyMemberByEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EXISTS_MEMBER);
    }


    //닉네임 중복 검사
    @Transactional(readOnly = true)
    private void verifyMemberByNickName(String nickname){
        Optional<Member> member = memberRepository.findByNickName(nickname);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EXISTS_MEMBER);
    }

    //회원이미지 URL 이미지이름 뽑아오는 메서드
    @Transactional(readOnly = true)
    private String findMemberByImgName(Member member){
        String url = member.getPictureUrl();

        return url.substring(url.lastIndexOf("/")+1);
    }
}
