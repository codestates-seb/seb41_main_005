package com.gigker.server.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

	// 404 (값이 없을 때)
	NOT_FOUND_MEMBER(404, "Member not found"),
	NOT_FOUND_CONTENT(404, "Content not found"),
	NOT_FOUND_APPLY(404, "Apply not found"),
	NOT_FOUND_REVIEW(404, "Review not found"),

	// 409 (중복)
	EXISTS_MEMBER(409,"Member exists"),
	EXISTS_EMAIL(409, "This Email is already in use"),
	EXISTS_NICKNAME(409, "This nickname is already in use"),
  	EXISTS_APPLY(409, "Applicant already applied");

	int code;
	String message;
}
