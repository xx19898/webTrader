package webTrader.webTraderBackEnd.Testing.StockData;


import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import webTraderBackEnd.stocksRequests.exceptions.HitCounterError;
import webTraderBackEnd.stocksRequests.stockApiHitCounter.StockApiHitCounterServiceImpl;


@Import(StockApiHitCounterTestConfig.class)
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class StockApiHitCounterTest{
	
	@Autowired
	@Qualifier("stockApiHitCounterServiceTestConfig")
	private StockApiHitCounterServiceImpl underTest;
	
	
	@Test
	void itShouldCountTimesApiBeenHitDuringLastMinute(){
		int timesStockApiBeenHit = (int)Math.round(Math.random() * ((5-1) + 1));
		System.out.println("Api's being hit " + timesStockApiBeenHit);
		try {
			underTest.incrementStockApiHitCount(timesStockApiBeenHit);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
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
	
	
	@Timeout(unit = TimeUnit.SECONDS,value = 10)
	@Test void itShouldAutomaticallyDeleteDatesFromHitCounterStackAfterTheyExpire() throws InterruptedException {
		try {
			underTest.incrementStockApiHitCount(2);
		} catch (HitCounterError e) {
			e.printStackTrace();
		}
		int initialNumbOfHitsInStack = underTest.getSizeOfStack();
		assertTrue(initialNumbOfHitsInStack == 2);
		//Awaitility.await().atLeast(10, TimeUnit.SECONDS).atMost(12, TimeUnit.SECONDS);
		CountDownLatch waiter = new CountDownLatch(1);
		waiter.await(5,TimeUnit.SECONDS);
		
		int finalNumbOfHitsInStack = underTest.getSizeOfStack();
		assertTrue(finalNumbOfHitsInStack == 0);
	}
	
	@Test void itShouldReturnArrayOfSecondsThatUserShouldWaitToCallApiAgain(){
		System.out.println("*******************");
		underTest.incrementStockApiHitCount(1);
		int[] array = new int[1];
		array[0] = 3;
		int[] resultArray = underTest.timeToWaitInSec();
		System.out.println("Result array to wait for " + resultArray[0]);
		assertTrue(resultArray[0] == array[0]);
	}
	
}
