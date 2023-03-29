package portfolioStocks;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.user.domain.User;

public class PortfolioTest {
	
	@Test
	void testThatAmountReturnedIsRight(){
		User user = new User();
		PortfolioStock firstStock = new PortfolioStock("GGL",2,2345,null);
		PortfolioStock secondStock = new PortfolioStock("GGL",3,2003,null);
		Set<PortfolioStock> portfolioStocks = new HashSet<>();
		portfolioStocks.add(firstStock);
		portfolioStocks.add(secondStock);
		Portfolio portfolio = new Portfolio(user,portfolioStocks,1999);
		portfolio.addNewStock(firstStock);
		portfolio.addNewStock(secondStock);
		
		assertEquals(5, portfolio.getAmountOfStockInsidePortfolio("GGL"));
	}
	
	@Test 
	void testThatRemoveStockWorks(){
		User user = new User();
		PortfolioStock firstStock = new PortfolioStock("GGL",2,2345,null);
		PortfolioStock secondStock = new PortfolioStock("GGL",3,2003,null);
		PortfolioStock thirdStock = new PortfolioStock("GGL",5,2003,null);
		Set<PortfolioStock> portfolioStocks = new HashSet<>();
		portfolioStocks.add(firstStock);
		portfolioStocks.add(secondStock);
		portfolioStocks.add(thirdStock);
		Portfolio portfolio = new Portfolio(user,portfolioStocks,1999);
		portfolio.addNewStock(firstStock);
		portfolio.addNewStock(secondStock);
		portfolio.removeStock("GGL", 8);
		
		assertEquals(2, portfolio.getAmountOfStockInsidePortfolio("GGL"));
		assertEquals(1,portfolio.getPortfolioStocks().size());
	}
	
	@Test
	void testThatImplementBuyingOperationWorks(){
		User user = new User();
		PortfolioStock firstStock = new PortfolioStock("GGL",2,2345,null);
		PortfolioStock secondStock = new PortfolioStock("GGL",3,2003,null);
		PortfolioStock thirdStock = new PortfolioStock("GGL",5,2003,null);
		Set<PortfolioStock> portfolioStocks = new HashSet<>();
		portfolioStocks.add(firstStock);
		portfolioStocks.add(secondStock);
		portfolioStocks.add(thirdStock);
		Portfolio portfolio = new Portfolio(user,portfolioStocks,2000);
		portfolio.addNewStock(firstStock);
		portfolio.addNewStock(secondStock);
		
		
		portfolio.implementBuyingOperation("AAPL", 2, 400);
		assertEquals(2, portfolio.getAmountOfStockInsidePortfolio("AAPL"));
		assertEquals(1200,portfolio.getBalance());
	}
	
	@Test
	void testThatImplementSellingOperationWorks(){
		User user = new User();
		PortfolioStock firstStock = new PortfolioStock("GGL",2,2345,null);
		PortfolioStock secondStock = new PortfolioStock("AAPL",3,2003,null);
		PortfolioStock thirdStock = new PortfolioStock("AAPL",5,2003,null);
		Set<PortfolioStock> portfolioStocks = new HashSet<>();
		portfolioStocks.add(firstStock);
		portfolioStocks.add(secondStock);
		portfolioStocks.add(thirdStock);
		Portfolio portfolio = new Portfolio(user,portfolioStocks,2000);
		portfolio.addNewStock(firstStock);
		portfolio.addNewStock(secondStock);
		
		portfolio.implementSellingOperation("AAPL", 2, 4000);
		assertEquals(6, portfolio.getAmountOfStockInsidePortfolio("AAPL"));
		assertEquals(10000,portfolio.getBalance());
	}
}
