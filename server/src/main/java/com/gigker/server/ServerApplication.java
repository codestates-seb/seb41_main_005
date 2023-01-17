package com.gigker.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*");
                corsFilter();
            }

            public void corsFilter() {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                corsConfiguration.addAllowedOriginPattern("*");
                corsConfiguration.addAllowedMethod("*");
                corsConfiguration.addAllowedHeader("*");
                corsConfiguration.addExposedHeader("authorization");
                source.registerCorsConfiguration("/**", corsConfiguration);
            }
        };
    }
}
