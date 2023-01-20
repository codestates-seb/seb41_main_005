package com.gigker.server.domain.location.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.location.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
