package com.gigker.server.global.security.filter;

import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import com.gigker.server.global.security.jwt.JwtTokenizer;
import com.gigker.server.global.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter{

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private RedisTemplate<String,String> redisTemplate;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException{
        try {
            Map<String, Object> claims = verifyJws(request);
            verifyBlacklist(request);
            setAuthenticationToContext(claims);
        }catch (SignatureException se){
            request.setAttribute("exception",se);
        }catch (ExpiredJwtException ee){
            request.setAttribute("exception",ee);
        }catch (Exception e){
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request,response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String,Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer","");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();
        return claims;
    }

    private void setAuthenticationToContext(Map<String,Object> claims){
        String username = (String)claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new
                UsernamePasswordAuthenticationToken(username,null,authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    //로그아웃한 토큰이면 접근못하게
    private void verifyBlacklist(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        String isLogout = (String)redisTemplate.opsForValue().get(jws);

        if(!ObjectUtils.isEmpty(isLogout)){
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
    }
}
