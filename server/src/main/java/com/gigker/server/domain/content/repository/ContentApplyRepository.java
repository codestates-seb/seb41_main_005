package com.gigker.server.domain.content.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;

public interface ContentApplyRepository extends JpaRepository<ContentApply, Long> {

	// ===== Apply =====

	Optional<ContentApply> findByApplicantAndContent(Member member, Content content);

	List<ContentApply> findAllByContent(Content content);

	Page<ContentApply> findAllByContent(Content content, Pageable pageable);

	// ContentApply 상태에 따라서 조회
	List<ContentApply> findAllByApplyStatus(ContentApply.ApplyStatus applyStatus);

	// ===== MATCH Schedule =====

	// 내가 신청한 스케쥴 목록 확인
	@Query("select DISTINCT ca from ContentApply ca " +
		"join fetch ca.applicant m " +
		"where m = :applicant and ca.applyStatus = 'MATCH'")
	List<ContentApply> findAllByMatchedApplicant(@Param("applicant") Member applicant);

	// 내가 작성한 스케쥴 목록 확인
	@Query("select DISTINCT ca from ContentApply ca " +
		"join fetch ca.content c join fetch c.member m " +
		"where m = :writer and ca.applyStatus = 'MATCH'")
	List<ContentApply> findAllByMatchedWriter(@Param("writer") Member writer);

	// ===== COMPLETE =====

	// 종합 완료 수
	@Query("select count (ca) from ContentApply ca " +
		"where ca.applicant = :applicant and ca.applyStatus = 'COMPLETE'")
	Long countByApplicant(@Param("applicant") Member applicant);

	// 게시글 타입별 완료 수
	@Query("select count (ca) from ContentApply ca " +
		"where ca.applicant = :applicant and ca.content.contentType = :type and ca.applyStatus = 'COMPLETE'")
	Long countByApplicantAndContentType(@Param("applicant") Member applicant, @Param("type") ContentType type);
}
