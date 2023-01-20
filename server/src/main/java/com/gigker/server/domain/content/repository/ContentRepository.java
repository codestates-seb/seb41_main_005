package com.gigker.server.domain.content.repository;

import com.gigker.server.domain.common.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.content.entity.Content;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findContentsByContentType(ContentType contentType);

    List<Content> findAllByStatus(Content.Status status);

    List<Content> findAllByStatusAndContentType(Content.Status status, ContentType type);
}
