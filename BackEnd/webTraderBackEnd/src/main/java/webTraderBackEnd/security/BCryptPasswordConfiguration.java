package webTraderBackEnd.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class BCryptPasswordConfiguration {
	
	@Bean
	BCryptPasswordEncoder passwordEncryptor() {
		return new BCryptPasswordEncoder(10);
	}

}
