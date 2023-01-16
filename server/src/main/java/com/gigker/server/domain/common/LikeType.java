package com.gigker.server.domain.common;

import lombok.Getter;

public enum LikeType {
	NONE(0), LIKE(1), DISLIKE(-1);

	@Getter
	private final int value;

	LikeType(int value) {
		this.value = value;
	}
}
