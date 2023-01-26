package com.gigker.server.global.security.service;


import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import com.gigker.server.global.security.jwt.JwtTokenizer;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@AllArgsConstructor
public class AuthService {

    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberService memberService;


    //토큰 재발급
    // access 토큰도 같이 받아서 access토큰이 만료가 되었으면 재발급해주는걸로 해줘야할거같다.
    // 현재로서는 무한 재발급이 가능..ㅋㅋ 일단 나중에 리펙토링하는걸로..
    public String generateAccessToken(HttpServletRequest request){
        Member member = memberService.getCurrentMember();
        String refreshToken = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        if(refreshToken == null || !refreshToken.startsWith("eyJhbGciOiJIUzI1NiJ9")){
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        if(!redisTemplate.opsForValue().get("RT:"+member.getEmail()).equals(refreshToken)){
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        return jwtTokenizer.generateAccessToken(member,base64EncodedSecretKey);
    }

    //로그아웃
    @Transactional
    public void logout(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");
        if(accessToken == null || !accessToken.startsWith("Bearer ")){
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }

        String jws = accessToken.replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        // Redis에서 해당 username로 저장된 refresh token이 있는지 여부를 확인 후, 있을 경우 삭제
        if (redisTemplate.opsForValue().get("RT:" + claims.get("username")) != null) {
            redisTemplate.delete("RT:" + claims.get("username"));
        }

        // access token의 남은 시간을 redis에 남은 시간을 만료시간으로 하는 blacklist 데이터로 저장
        Long expiration = jwtTokenizer.getExpiration(jws,base64EncodedSecretKey);

        redisTemplate.opsForValue().set(jws, "blacklist", expiration, TimeUnit.MILLISECONDS);

        SecurityContextHolder.clearContext();
    }
}
