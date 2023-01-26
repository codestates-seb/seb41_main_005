package com.gigker.server.domain.location.repository;

import com.gigker.server.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.location.entity.Location;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByCityName(String cityName);
}