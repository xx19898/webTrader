package webTrader.webTraderBackEnd.utility;

import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.databind.ObjectMapper;

public class jsonUtility {
	
	@Bean
	public ObjectMapper jsonObjectMapper() {
		return new ObjectMapper();
	}

}
