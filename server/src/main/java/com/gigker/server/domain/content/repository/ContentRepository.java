package com.gigker.server.domain.content.repository;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.ContentType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.location.entity.Location;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findContentsByContentType(ContentType contentType);

    List<Content> findAllByStatusAndContentType(Content.Status status, ContentType type);

    // == DeadLine Management ==
    @Query("select c from Content c where c.status = :status")
    List<Content> findAllByStatus(@Param("status") Content.Status status);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Content c set c.status = 'RECRUITING' where c.contentId in :ids")
    void updateContentStatusByIds(@Param("ids") List<Long> contentIds);

    // == Get ==
    Page<Content> findAll(Pageable pageable);

    Page<Content> findAllByCategory(Category category, Pageable pageable);

    Page<Content> findAllByLocation(Location location, Pageable pageable);

    Page<Content> findAllByCategoryAndLocation(Category category, Location location, Pageable pageable);
}
