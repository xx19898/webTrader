package main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import repo.UserRepo;

@SpringBootApplication()
public class WebTraderBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebTraderBackEndApplication.class, args);
	}

}