package utility;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StockDataApiConstantsServiceConfig {
	@Bean
	public StockDataApiConstantsService StockDataApiConstantsServiceConfig() {
		return new StockDataApiConstantsServiceImpl(5, 60);
	}

}
