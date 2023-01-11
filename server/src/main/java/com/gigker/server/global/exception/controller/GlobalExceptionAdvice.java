package com.gigker.server.global.exception.controller;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;

import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {
	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleMethodArgumentNotValidException(
		MethodArgumentNotValidException e) {
		final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

		return response;
	}

	@ExceptionHandler({
		IllegalStateException.class, IllegalArgumentException.class,
		TypeMismatchException.class, HttpMessageNotReadableException.class,
		MissingServletRequestParameterException.class, MultipartException.class,
	})
	public ErrorResponse handleBadRequestException(Exception e) {
		log.debug("Bad request exception occurred: {}", e.getMessage(), e);
		return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
		final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

		return response;
	}

	@ExceptionHandler
	public ResponseEntity<ErrorResponse> handleBusinessLogicException(BusinessLogicException e) {
		final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

		return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getCode() / 100));
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
		final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleException(Exception e) {
		log.error("# handle Exception", e);
		final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
		return response;
	}
}
