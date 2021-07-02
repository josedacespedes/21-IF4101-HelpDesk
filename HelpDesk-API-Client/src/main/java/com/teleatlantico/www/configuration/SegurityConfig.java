package com.teleatlantico.www.configuration;

import com.teleatlantico.www.security.AuthenticationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SegurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterAfter(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/**/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/**/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/**/**").permitAll()
                .and()
                .csrf().disable()
                .headers().frameOptions().sameOrigin()
                .and()
                .formLogin().disable();
    }
}