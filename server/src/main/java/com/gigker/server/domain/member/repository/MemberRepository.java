package com.gigker.server.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
