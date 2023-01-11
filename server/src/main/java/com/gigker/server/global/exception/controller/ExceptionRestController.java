package com.gigker.server.global.exception.controller;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.global.exception.ExceptionCode;

@RestController
@RequestMapping("/errors")
public class ExceptionRestController {
	@GetMapping
	public ResponseEntity<Map<Object, String>> getAll() {
		return ResponseEntity.ok(toMap(ExceptionCode.values()));
	}

	private Map<Object, String> toMap(ExceptionCode[] errors) {
		return Arrays.stream(errors)
			.collect(Collectors.toMap(ExceptionCode::getCode, ExceptionCode::getMessage));
	}
}
