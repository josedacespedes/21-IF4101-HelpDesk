package com.teleatlantico.www;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(scanBasePackages = { "com.teleatlantico.www.*" })
@ComponentScan({ "com.teleatlantico.www.controller", "com.teleatlantico.www.repository", "com.teleatlantico.www.service" } )
@EntityScan("com.teleatlantico.www.domain")
@EnableJpaRepositories("com.teleatlantico.www.repository")
public class TeleAtlanticoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeleAtlanticoApplication.class, args);
    }

}
