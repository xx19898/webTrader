package webTrader.webTraderBackEnd.Testing.StockData;

import static org.junit.Assert.assertTrue;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import webTrader.webTraderBackEnd.service.StockApiHitCounterServiceImpl;


@RunWith(SpringRunner.class )
@SpringBootTest
class StockApiHitCounterTest {
	
	@Autowired
	private StockApiHitCounterServiceImpl underTest;
	
	
	@Test
	void itShouldCountTimesApiBeenHitDuringLastMinute() {
		underTest.incrementStockApiHitCount((int)Math.round(Math.random() * ((5-1) + 1)));
		assertTrue("Stock Api Hit Counter does not get incremented on hit",underTest.numberOfTimesStockApiBeenHitDuringLastMinute() > 0);	 
	}

}
