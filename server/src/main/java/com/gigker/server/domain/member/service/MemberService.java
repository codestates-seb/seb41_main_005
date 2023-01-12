package com.gigker.server.domain.member.service;

import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.entity.Profile;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.repository.ProfileRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import com.gigker.server.global.s3.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    @Autowired
    private S3Service s3Service;

    public MemberService(MemberRepository memberRepository, ProfileRepository profileRepository) {
        this.memberRepository = memberRepository;
        this.profileRepository = profileRepository;
    }

    //회원가입
    public Member saveMember(Member member, Profile profile, MultipartFile image) throws IOException {
        verifyMemberByEmail(member.getEmail());
        verifyMemberByNickName(member.getNickName());
        profileRepository.save(profile);    //member회원가입시 프로필 정보 db 생성

        if(!image.isEmpty()){   //이미지 파일이 들어있으면 S3에 파일저장하고 Member객체에 URl변환하여 넣어줌.
            String imgUrl = s3Service.imgUpload(image,"images");
            member.setPictureUrl(imgUrl);
        }

        member.addProfile(profile);         //member에 해당profile add
        return memberRepository.save(member);
    }


    //회원 조회
    private Member findMemberById(Long memberid)
    {
        return memberRepository.findById(memberid)
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
