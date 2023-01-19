package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.tag.entity.Tag;
import lombok.*;

@Data
@AllArgsConstructor
public class ContentTagResponseDto {
    private Long ContentId;
    private Long tagId;
    private String tagName;
}
