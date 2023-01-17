package com.gigker.server.global.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;

@Getter
public class MultiResponseDto<E, T> {
	private E info;
	private List<T> data;
	private PageInfo pageInfo;

	public MultiResponseDto(List<T> data, Page page) {
		this.data = data;
		this.pageInfo = new PageInfo(page.getNumber() + 1,
			page.getSize(), page.getTotalElements(), page.getTotalPages());
	}

	public MultiResponseDto(E info, List<T> data, Page page) {
		this.info = info;
		this.data = data;
		this.pageInfo = new PageInfo(page.getNumber() + 1,
			page.getSize(), page.getTotalElements(), page.getTotalPages());
	}
}
