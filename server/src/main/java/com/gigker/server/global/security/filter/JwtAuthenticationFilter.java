package com.gigker.server.global.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import com.gigker.server.global.security.dto.LoginDto;
import com.gigker.server.global.security.jwt.JwtTokenizer;
import com.gigker.server.global.security.utils.ErrorResponder;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String,String> redisTemplate;


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response){
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto.Post postDto = objectMapper.readValue(request.getInputStream(),
                LoginDto.Post.class);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(postDto.getUsername(),
                postDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        //회원 탈퇴되어있을 시 토큰 반환 대신 exception
        if(member.getMemberStatus().name().equals("MEMBER_QUIT")) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_STATUS_SECESSION);
        }

        String accessToken = delegateAccessToken(member);
        Map<String, Object> map = delegateRefreshToken(member);
        String refreshToken = (String)map.get("refresh");

        //리프레쉬토큰 레디스에 저장
        redisTemplate.opsForValue()
                        .set("RT:" + member.getEmail(),refreshToken,((Date)map.get("expiration")).getTime(),
                                TimeUnit.MINUTES);

        response.setHeader("Authorization", "Bearer " +accessToken);
        response.setHeader("Refresh",refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);

    }

    private String delegateAccessToken(Member member){
        Map<String,Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("username", member.getEmail());
        claims.put("roles",member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);
        return accessToken;
    }

    private Map<String,Object> delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.
                getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey =
                jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

        Map<String,Object> map = new HashMap<>();
        map.put("refresh",refreshToken);
        map.put("expiration",expiration);
        return map;
    }
}
