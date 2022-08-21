package webTrader.webTraderBackEnd.Config.Stock;

import java.util.ArrayDeque;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import webTrader.webTraderBackEnd.service.StockApiHitCounterService;
import webTrader.webTraderBackEnd.service.StockApiHitCounterServiceImpl;
import webTrader.webTraderBackEnd.utility.Constants;
import webTrader.webTraderBackEnd.utility.StockDataApiConstantsService;


@Configuration
public class ApiHitCounterConfiguration {
	@Autowired
	StockDataApiConstantsService stockConstantsService;
	
	@Bean
	StockApiHitCounterService stockApiHitCounterService() {
		return new StockApiHitCounterServiceImpl(new ArrayDeque<Date>(), stockConstantsService.getTimeLimitInSeconds(),stockConstantsService.getMaxLimitOfStockApiCallsTimeLimit());
	}
	
	

}


