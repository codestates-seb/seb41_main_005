package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContentPostDto {
    private Long memberId;
    private String title;
    private ContentType contentType;
    private Integer recruitingCount;
    private String workContent;
    private String qualification;
    private String preference;
    private String other;
//    private Category category;
    private List<ContentTagResponseDto.Post> contentTagList;
    private List<WorkTime> workTimes;
    private String location;
    private int price;
    private LocalDateTime deadLine;
    private boolean isPremium;
}
