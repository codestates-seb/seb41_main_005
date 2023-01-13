package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContentTagResponseDto {
    private long ContentId;
    private long tagId;
    private String name;
}
