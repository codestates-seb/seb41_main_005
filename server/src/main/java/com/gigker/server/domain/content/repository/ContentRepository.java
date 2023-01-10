package com.gigker.server.domain.content.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.content.entity.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {

}
