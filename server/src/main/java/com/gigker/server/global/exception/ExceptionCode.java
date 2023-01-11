package com.gigker.server.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

	// 404
	NOT_FOUND_MEMBER(404, "Member not found"),
	NOT_FOUND_CONTENT(404, "Content not found"),
	NOT_FOUND_REVIEW(404, "Review not found");

	int code;
	String message;
}
