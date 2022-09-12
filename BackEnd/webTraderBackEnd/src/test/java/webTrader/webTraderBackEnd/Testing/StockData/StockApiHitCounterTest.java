package webTrader.webTraderBackEnd.Testing.StockData;


import static org.junit.jupiter.api.Assertions.*;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import exceptions.Api.HitCounterError;
import stockApiHitCounter.StockApiHitCounterServiceImpl;

import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.awaitility.Awaitility;


@Import(StockApiHitCounterTestConfig.class)
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class StockApiHitCounterTest {
	
	@Autowired
	@Qualifier("stockApiHitCounterServiceTestConfig")
	private StockApiHitCounterServiceImpl underTest;
	
	
	@Test
	void itShouldCountTimesApiBeenHitDuringLastMinute() {
		int timesStockApiBeenHit = (int)Math.round(Math.random() * ((5-1) + 1));
		System.out.println("Api's being hit " + timesStockApiBeenHit);
		try {
			underTest.incrementStockApiHitCount(timesStockApiBeenHit);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
		System.out.println(underTest.numberOfTimesStockApiBeenHitDuringLastTimePeriod());
	    assertTrue(underTest.numberOfTimesStockApiBeenHitDuringLastTimePeriod() == timesStockApiBeenHit,"Stock Api Hit Counter does not get incremented on hit");	 
	}
	@Test
	void itShouldNotAcceptMoreThanFiveSimultaneousHits() {
		Exception exception = assertThrows(HitCounterError.class,() -> { underTest.incrementStockApiHitCount(6); });
		String expectedMessage = "Sorry, but api cannot process that amount of requests right now";
		String actualMessage = exception.getMessage();
		assertTrue(actualMessage.contains(expectedMessage));
	}
	@Test
	void itShouldNotLetAnyHitCounterBeAddedWhenThereAlreadyIsFiveHits() {
		try {
			underTest.incrementStockApiHitCount(5);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
		Exception exception = assertThrows(HitCounterError.class,() -> {underTest.incrementStockApiHitCount(1);});
		String expectedMessage = "Sorry, the hit counter counter stack is already full";
		String actualMessage = exception.getMessage();
		assertTrue(actualMessage.contains(expectedMessage));
	}
	
	//TODO: next write a test for making sure that the apihit timestamp gets deleted from the stack after one minute is passed and 
	// implement the functionality on the main class
	
	@Timeout(unit = TimeUnit.SECONDS,value = 10)
	@Test void itShouldAutomaticallyDeleteDatesFromHitCounterStackAfterTheyExpire() {
		try {
			underTest.incrementStockApiHitCount(2);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
		assertTrue(underTest.getSizeOfStack() == 2);
		Awaitility.await().atLeast(2, TimeUnit.SECONDS).atMost(4, TimeUnit.SECONDS);
		
		assertTrue(underTest.getSizeOfStack() == 0);
	}
	
}
