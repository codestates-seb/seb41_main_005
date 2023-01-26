package com.gigker.server.global.security.dto;

import lombok.Getter;
import lombok.Setter;


public class LoginDto {
    @Getter
    public static class Post {
        private String username;
        private String password;
    }

    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String email;
        private String nickName;
        private String pictureUrl;
        private String about;
    }
}
