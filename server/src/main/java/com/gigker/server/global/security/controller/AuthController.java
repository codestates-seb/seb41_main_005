package com.gigker.server.global.security.controller;



import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.security.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        authService.logout(request);
        Map<String,String> response = new HashMap<>();
        response.put("message", "로그아웃 되셨습니다.");

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    //accessToken 만료시 재발급
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response){
       String accessToken = authService.generateAccessToken(request);
        response.setHeader("Authorization", "Bearer " +accessToken);

        Map<String,String> message = new HashMap<>();

        message.put("message","accessToken을 재발급 하였습니다.");

        return new ResponseEntity<>(message,HttpStatus.OK);
    }
}
