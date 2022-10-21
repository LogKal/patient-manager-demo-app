package com.lkaltz.healthcare.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer{
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //permits all requests
        http.csrf().disable().authorizeRequests().anyRequest().permitAll();
        return http.build();
    }
}
