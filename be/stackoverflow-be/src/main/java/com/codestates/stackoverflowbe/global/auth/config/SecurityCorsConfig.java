package com.codestates.stackoverflowbe.global.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        //URL 기반의 CORS 설정을 관리
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //CorsConfiguration 객체를 생성합니다. 이 클래스는 실제 CORS 설정을 담당하는 클래스
        CorsConfiguration config = new CorsConfiguration();
        //config.setAllowCredentials(true);: 요청에서 자격증명(쿠키, 인증 헤더 등)을 허용
        config.setAllowCredentials(true);
//        config.addAllowedOriginPattern("*");

        config.addAllowedOriginPattern("http://localhost:80"); // 로컬 아파치 환경에서 접근하는 CORS 허용
        config.addAllowedOriginPattern("http://localhost:3000"); // 로컬 프론트 환경에서 접근하는 CORS 허용
        config.addAllowedOriginPattern("http://seveneleven-stackoverflow-s3.s3-website.ap-northeast-2.amazonaws.com"); // 배포 환경

//        //응답 헤더에 Authorization 헤더를 노출하도록 설정
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Refresh");

        config.addAllowedHeader("*"); //특정 header만 허용
        config.addAllowedMethod("GET"); //특정 메소드만 허용
        config.addAllowedMethod("POST"); //특정 메소드만 허용
        config.addAllowedMethod("DELETE"); //특정 메소드만 허용
        config.addAllowedMethod("PATCH"); //특정 메소드만 허용

        source.registerCorsConfiguration("/**", config); //corsConfiguration으로 등록

        return new CorsFilter(source);
    }
}
