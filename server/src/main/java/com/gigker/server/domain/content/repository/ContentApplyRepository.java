package com.gigker.server.domain.content.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;

public interface ContentApplyRepository extends JpaRepository<ContentApply, Long> {
	Optional<ContentApply> findByApplicantAndContent(Member member, Content content);
}
