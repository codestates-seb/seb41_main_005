package com.gigker.server.global.exception;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import lombok.Getter;

@Getter
public class ErrorResponse {
	private int status;
	private String message;
	private List<FieldError> fieldErrors;
	private List<ConstraintViolationError> violationErrors;

	private ErrorResponse(int status, String message) {
		this.status = status;
		this.message = message;
	}

	private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors) {
		this.fieldErrors = fieldErrors;
		this.violationErrors = violationErrors;
	}

	public static ErrorResponse of(BindingResult bindingResult) {
		return new ErrorResponse(FieldError.of(bindingResult), null);
	}

	public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
		return new ErrorResponse(null, ConstraintViolationError.of(violations));
	}

	public static ErrorResponse of(ExceptionCode exceptionCode) {
		return new ErrorResponse(exceptionCode.getCode(), exceptionCode.getMessage());
	}

	public static ErrorResponse of(HttpStatus httpStatus) {
		return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
	}

	public static ErrorResponse of(HttpStatus httpStatus, String message) {
		return new ErrorResponse(httpStatus.value(), message);
	}

	@Getter
	public static class FieldError {
		private final String field;
		private final Object rejectedValue;
		private final String reason;

		private FieldError(String field, Object rejectedValue, String reason) {
			this.field = field;
			this.rejectedValue = rejectedValue;
			this.reason = reason;
		}

		public static List<FieldError> of(BindingResult bindingResult) {
			final List<org.springframework.validation.FieldError> fieldErrors =
				bindingResult.getFieldErrors();
			return fieldErrors.stream()
				.map(error -> new FieldError(
					error.getField(),
					error.getRejectedValue() == null ?
						"" : error.getRejectedValue().toString(),
					error.getDefaultMessage()))
				.collect(Collectors.toList());
		}
	}

	@Getter
	public static class ConstraintViolationError {
		private final String propertyPath;
		private final Object rejectedValue;
		private final String reason;

		private ConstraintViolationError(String propertyPath, Object rejectedValue,
			String reason) {
			this.propertyPath = propertyPath;
			this.rejectedValue = rejectedValue;
			this.reason = reason;
		}

		public static List<ConstraintViolationError> of(
			Set<ConstraintViolation<?>> constraintViolations) {
			return constraintViolations.stream()
				.map(constraintViolation -> new ConstraintViolationError(
					constraintViolation.getPropertyPath().toString(),
					constraintViolation.getInvalidValue().toString(),
					constraintViolation.getMessage()
				)).collect(Collectors.toList());
		}
	}
}
