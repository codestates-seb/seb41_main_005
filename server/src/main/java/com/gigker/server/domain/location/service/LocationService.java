package com.gigker.server.domain.location.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.location.entity.Location;
import com.gigker.server.domain.location.repository.LocationRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class LocationService {
	private final LocationRepository locationRepository;

	public Location findExistLocation(String cityName) {
		Optional<Location> optionalLocation = locationRepository.findByCityName(cityName);
		Location findLocation =
			optionalLocation.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.NOT_FOUND_LOCATION));
		return findLocation;
	}

	public List<Location> findLocations() {
		return locationRepository.findAll();
	}
}
