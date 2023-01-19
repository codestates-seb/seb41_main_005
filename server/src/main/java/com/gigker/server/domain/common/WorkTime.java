package com.gigker.server.domain.common;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.gigker.server.domain.content.entity.Content;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Data
public class WorkTime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long workTimeId;

	@Column(nullable = false)
	private LocalDateTime startWorkTime;

	@Column(nullable = false)
	private LocalDateTime endWorkTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "content_id", nullable = false)
	private Content content;
}
