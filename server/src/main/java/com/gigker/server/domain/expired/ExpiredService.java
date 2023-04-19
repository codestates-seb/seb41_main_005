package com.gigker.server.domain.expired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.repository.ContentApplyRepository;
import com.gigker.server.domain.content.repository.ContentRepository;
import com.gigker.server.domain.workTime.entity.WorkTime;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class ExpiredService {
	private final ContentRepository contentRepository;
	private final ContentApplyRepository applyRepository;

	// 30분 마다 만료된 글을 찾아서 상태를 변경해준다.
	// https://brunch.co.kr/@purpledev/32
	@Scheduled(cron = "1 0/30 * * * *")
	public void toExpireContent() {
		List<Long> expiredIds = contentRepository.findAllByStatus(Content.Status.RECRUITING)
			.stream()
			.filter(c -> Objects.nonNull(c.getDeadLine()))	// null 체크
			.filter(c -> c.getDeadLine().isBefore(LocalDateTime.now()))	// 마감 시간(0초)이 현재 시간(1초) 보다 이전인가?
			.map(Content::getContentId)
			.collect(Collectors.toList());

		final AtomicInteger count = new AtomicInteger();

		expiredIds.stream()
			.collect(Collectors.groupingBy(contentId -> count.getAndIncrement() / 1000))
			.values()
			.forEach(this::bulkUpdateStatus);
	}

	// 30분 마다 완료된 지원과 글을 찾아서 상태를 변경해준다.
	@Scheduled(cron = "2 0/30 * * * *")
	public void toCompleteContentAndApply() {
		List<ContentApply> applies = applyRepository.findAllByApplyStatus(ContentApply.ApplyStatus.MATCH);

		// ContentApply EndWorkTime 이 모두 지났다면 완료
		for (ContentApply apply : applies) {
			List<WorkTime> workTimes = apply.getContent().getWorkTimes();
			long count = -1;

			if (workTimes != null && workTimes.size() != 0) {    // null 체크 (Optional<WorkTime>)
				count = workTimes.stream()
					// 완료 시간(0초)이 현재 시간(2초)보다 이후인가?
					.filter(workTime -> workTime.getEndWorkTime().isAfter(LocalDateTime.now()))
					.count();
			}

			if (count == 0) {
				apply.complete();
				apply.getContent().setStatus(Content.Status.COMPLETED);
			}
		}
	}

	private void bulkUpdateStatus(List<Long> contentIds) {
		contentRepository.updateContentStatusByIds(contentIds);
	}
}
