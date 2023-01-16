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
            String imgUrl = s3Service.imgUpload(image,"images");
            member.setPictureUrl(imgUrl);
        }

        member.addProfile(profile);         //member에 해당profile add
        return memberRepository.save(member);
    }


    //회원 조회
    public Member findMemberById(Long memberId)
    {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_MEMBER));
    }


    //이메일 중복 검사
    private void verifyMemberByEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EXISTS_MEMBER);
    }


    //닉네임 중복 검사
    private void verifyMemberByNickName(String nickname){
        Optional<Member> member = memberRepository.findByNickName(nickname);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EXISTS_MEMBER);
    }
}
