package webTraderBackEnd.stocksRequests.stockApiHitCounter;

import java.util.ArrayDeque;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import webTraderBackEnd.stocksRequests.utility.StockDataApiConstantsService;
import webTraderBackEnd.utility.Constants;


@Configuration
public class ApiHitCounterConfiguration {
	@Autowired
	StockDataApiConstantsService stockConstantsService;
	
	@Bean
	StockApiHitCounterService stockApiHitCounterService() {
		return new StockApiHitCounterServiceImpl(new ArrayDeque<Date>(), stockConstantsService.getTimeLimitInSeconds(),stockConstantsService.getMaxLimitOfStockApiCallsTimeLimit());
	}
	
	

}


