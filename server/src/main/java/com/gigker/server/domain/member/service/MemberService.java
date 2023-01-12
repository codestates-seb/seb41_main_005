package com.gigker.server.domain.member.service;

import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.entity.Profile;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.repository.ProfileRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;

    public MemberService(MemberRepository memberRepository, ProfileRepository profileRepository) {
        this.memberRepository = memberRepository;
        this.profileRepository = profileRepository;
    }

    //회원가입
    public Member saveMember(Member member,Profile profile){
        verifyMemberByEmail(member.getEmail());
        verifyMemberByNickName(member.getNickName());
        profileRepository.save(profile);    //member회원가입시 프로필 정보 db 생성
        member.addProfile(profile);
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
