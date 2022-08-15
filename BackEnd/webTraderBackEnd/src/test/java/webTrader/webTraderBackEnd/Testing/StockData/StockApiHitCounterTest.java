package webTrader.webTraderBackEnd.Testing.StockData;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import webTrader.webTraderBackEnd.exceptions.Api.HitCounterError;
import webTrader.webTraderBackEnd.service.StockApiHitCounterServiceImpl;


@RunWith(SpringRunner.class )
@SpringBootTest
class StockApiHitCounterTest {
	
	@Autowired
	private StockApiHitCounterServiceImpl underTest;
	
	
	@Test
	void itShouldCountTimesApiBeenHitDuringLastMinute() {
		int timesStockApiBeenHit = (int)Math.round(Math.random() * ((5-1) + 1));
		System.out.println(timesStockApiBeenHit);
		try {
			underTest.incrementStockApiHitCount(timesStockApiBeenHit);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
		assertTrue("Stock Api Hit Counter does not get incremented on hit",underTest.numberOfTimesStockApiBeenHitDuringLastMinute() > 0);	 
	}
	
	@Test
	void itShouldNotAcceptMoreThanFiveSimultaneousHits() {
		Exception exception = assertThrows(HitCounterError.class,() -> { underTest.incrementStockApiHitCount(6); });
		String expectedMessage = "Sorry, but api cannot process that amount of requests right now";
		String actualMessage = exception.getMessage();
		assertTrue(actualMessage.contains(expectedMessage));
	}
	
	//TODO: implement the test, implement the functionality
	@Test
	void itShouldNotLetAnyHitCounterBeAddedWhenThereAlreadyIsFiveHits() {
		
	}

}
