package com.gigker.server.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

	// 400 Bad Request (잘못된 요구)
	NO_PERMISSION(400, "No permission"), //권한이 없는 사용자의 요청
	BAD_REQUEST_APPLY(400, "Writer cannot apply"),
	BAD_REQUEST_RECRUITING(400, "This content is not being recruited"),
	BAD_REQUEST_REVIEW(400, "Review can write when status is completed"),
	EDIT_NOT_ALLOWED(400, "Edit not allowed"),
	DELETE_NOT_ALLOWED(400,"No Permission"),
	INVALID_TOKEN(400,"Invalid token"),

	// 401 (권한없음)
	MEMBER_STATUS_SECESSION(401,"현재 회원은 탈퇴된 상태입니다"),

	// 404
	NOT_FOUND_MEMBER(404, "Member not found"),
	NOT_FOUND_CONTENT(404, "Content not found"),
	NOT_FOUND_APPLY(404, "Apply not found"),
	NOT_FOUND_REVIEW(404, "Review not found"),
	NOT_FOUND_CATEGORY(404, "Category not found"),
	NOT_FOUND_LOCATION(404, "Location not found"),

	// 409 (중복)
	EXISTS_MEMBER(409,"Member exists"),
	EXISTS_EMAIL(409, "This Email is already in use"),
	EXISTS_NICKNAME(409, "This nickname is already in use"),
  	EXISTS_APPLY(409, "Applicant already applied"),
	EXISTS_REVIEW(409, "This member already wrote review");

	int code;
	String message;
}
