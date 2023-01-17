package com.gigker.server.global.config;


import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.global.security.filter.JwtAuthenticationFilter;
import com.gigker.server.global.security.filter.JwtVerificationFilter;
import com.gigker.server.global.security.handler.MemberAccessDeniedHandler;
import com.gigker.server.global.security.handler.MemberAuthenticationEntryPoint;
import com.gigker.server.global.security.handler.MemberAuthenticationFailureHandler;
import com.gigker.server.global.security.handler.MemberAuthenticationSuccessHandler;
import com.gigker.server.global.security.jwt.JwtTokenizer;
import com.gigker.server.global.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration{

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter())
                .cors(Customizer.withDefaults())
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
                .and()
                .apply(new CustomFilterConfigure())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.POST, "/*/contents").hasAnyRole("ADMIN", "USER")
                        .antMatchers(HttpMethod.PATCH, "/*/contents/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/contents/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/reviews").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/reviews/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.POST, "/**/reviews/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/**/reviews/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/**/reviews/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.POST, "/*/profiles").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/profiles/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/profiles/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.GET, "/**/members/**/schedules").hasRole("USER")
                        .antMatchers(HttpMethod.OPTIONS,"*/member/*").permitAll()
                        .anyRequest().permitAll()
                );
        return http.build();
    }
    private CorsFilter corsFilter()
    {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.addExposedHeader("authorization");
        config.setAllowCredentials(true); //내서버가 응답을 할 때 json 을 자바스크립트에서 처리할 수 있게 할지를 설정하는것
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    public class CustomFilterConfigure extends AbstractHttpConfigurer<CustomFilterConfigure, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);


            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
