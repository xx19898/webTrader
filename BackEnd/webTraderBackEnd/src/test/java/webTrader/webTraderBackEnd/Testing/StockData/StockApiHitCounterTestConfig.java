package webTrader.webTraderBackEnd.Testing.StockData;

import java.util.ArrayDeque;
import java.util.Date;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import stockApiHitCounter.StockApiHitCounterServiceImpl;


@TestConfiguration
public class StockApiHitCounterTestConfig {
	@Bean(name="stockApiHitCounterServiceTestConfig")
	public StockApiHitCounterServiceImpl getStockApiHitCounterServiceTestConfig() {
		return new StockApiHitCounterServiceImpl(new ArrayDeque<Date>(),3,5);
	}
	

}

