package com.gigker.server.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>
{
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickName(String nickname);

}
