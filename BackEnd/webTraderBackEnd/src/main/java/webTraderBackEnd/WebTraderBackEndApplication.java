package webTraderBackEnd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import webTraderBackEnd.user.repository.UserRepo;

@SpringBootApplication()
public class WebTraderBackEndApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebTraderBackEndApplication.class, args);
	}
}
