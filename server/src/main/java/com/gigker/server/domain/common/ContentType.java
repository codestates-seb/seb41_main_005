package com.gigker.server.domain.common;

import lombok.Getter;

public enum ContentType {
	BUY("buy"), SELL("sell");

	@Getter
	private final String type;

	ContentType(String type) {
		this.type = type;
	}
}
