package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.tag.entity.Tag;
import lombok.*;

public class ContentTagResponseDto {

    @Data
    @NoArgsConstructor
    public static class Post {
        private Long tagId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Tags {
        private long ContentId;
        private Long tagId;
        private String tagName;
    }
}
