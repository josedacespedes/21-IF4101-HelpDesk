package com.sistemaHelpDesk.appClient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AppClientApplication {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(AppClientApplication.class, args);
	}
}
