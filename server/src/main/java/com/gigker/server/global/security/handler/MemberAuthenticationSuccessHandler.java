package com.gigker.server.global.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.mapper.MemberMapper;
import com.gigker.server.global.security.dto.LoginDto;
import com.gigker.server.global.security.mapper.LoginMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final LoginMapper loginMapper;

    public MemberAuthenticationSuccessHandler(LoginMapper mapper) {
        this.loginMapper = mapper;
    }

    //로그인하면 로그인한 회원정보 response
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                                  HttpServletResponse response,
                                                  Authentication authentication) throws IOException{
        Member member = (Member)authentication.getPrincipal();
        LoginDto.Response responseDto = loginMapper.loginMemberToLoginResponseDto(member);

        String body = new ObjectMapper().writeValueAsString(responseDto);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(body);

        log.info("# Authenticated successfully!");
    }


}

