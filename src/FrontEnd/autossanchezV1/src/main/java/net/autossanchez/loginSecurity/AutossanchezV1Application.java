package net.autossanchez.loginSecurity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"net.autossanchez"})
@SpringBootApplication
public class AutossanchezV1Application {

	public static void main(String[] args) {
		SpringApplication.run(AutossanchezV1Application.class, args);
	}

}
