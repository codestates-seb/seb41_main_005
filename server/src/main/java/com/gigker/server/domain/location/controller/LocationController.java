package com.gigker.server.domain.location.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.location.service.LocationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/locations")
public class LocationController {
	private final LocationService locationService;

	@GetMapping
	public ResponseEntity getLocations() {
		return ResponseEntity.status(HttpStatus.OK).body(locationService.findLocations());
	}
}
