package com.gigker.server.domain.content.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;

public interface ContentApplyRepository extends JpaRepository<ContentApply, Long> {
	Optional<ContentApply> findByApplicantAndContent(Member member, Content content);

	List<ContentApply> findAllByContent(Content content);

	Page<ContentApply> findAllByContent(Content content, Pageable pageable);
}
