package com.gigker.server.domain.content.repository;

import com.gigker.server.domain.content.entity.ContentTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentTagRepository extends JpaRepository<ContentTag, Long> {
    @Query(value = "select * from content_tag where content_id = :contentId",nativeQuery = true)
    List<ContentTag> findAllByContent(@Param("contentId") Long contentId);
}
