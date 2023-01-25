package com.gigker.server.domain.contentApply;

import static com.gigker.server.domain.stub.ContentApplyStubData.*;
import static com.gigker.server.domain.stub.ContentStubData.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;

@DisplayName("스케쥴러 테스트")
public class SchedulerTest {

	@Test
	void scheduledExpiry() {
		// DeadLine : 현재 시각 + 1일
		List<Content> contents = getContents();

		// StubDateTime : 현재 시각 + 1일 + 2초
		LocalDateTime stubDateTime = LocalDateTime.now().plusDays(1).plusSeconds(2);

		System.out.println("[content] workTimeSize : " + contents.get(0).getWorkTimes().size());

		// 만료 기한이 지났다면 상태 변경
		for (Content content : contents) {
			if (content.getDeadLine() != null && content.getDeadLine().isBefore(stubDateTime)) {
				content.setStatus(Content.Status.EXPIRED);
			}
		}

		// 모두 만료가 됐는지 확인
		for (Content content : contents) {
			assertEquals(Content.Status.EXPIRED, content.getStatus());
		}
	}

	@Test
	void scheduledCompletion() {
		// EndWorkTime : 현재 시각 + 1일
		List<ContentApply> applies = getApplies();

		// StubDateTime : 현재 시각 + 1일 + 1초
		LocalDateTime stubDateTime = LocalDateTime.now().plusDays(1).plusSeconds(1);

		// 작업 시간이 지났다면 상태 변경
		for (ContentApply apply : applies) {
			List<WorkTime> workTimes = apply.getContent().getWorkTimes();
			long count = -1;

			System.out.println("[apply] workTimeSize : " + workTimes.size());

			if (workTimes != null && workTimes.size() != 0) {
				count = workTimes.stream()
					.peek(a -> System.out.println("before filter : " + a.getEndWorkTime()))
					// 완료 시간(0초)이 현재 시간(1초)보다 미래인가?
					.filter(workTime -> workTime.getEndWorkTime().isAfter(stubDateTime))
					.peek(a -> System.out.println("after filter : " + a.getEndWorkTime()))
					.count();
			}

			System.out.println("count : " + count);

			if (count == 0) {
				apply.complete();
				apply.getContent().setStatus(Content.Status.COMPLETED);
			}
		}

		// 모두 작업 완료 상태가 됐는지 확인
		for (ContentApply apply : applies) {
			assertEquals(ContentApply.ApplyStatus.COMPLETE, apply.getApplyStatus());
		}
	}
}
