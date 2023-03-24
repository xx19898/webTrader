package webTraderBackEnd.portfolioStocks.dtoConverters;

import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;

@Transactional
@Component
public class StockDealToPortfolioStockConverter{
	public PortfolioStock convert(StockDeal stockDeal,Portfolio portfolio){
		PortfolioStock newPortfolioStock = new PortfolioStock(stockDeal.getSymbol(),stockDeal.getQuantity(),stockDeal.getStockPriceAtTheAcquirement(),portfolio);
		return newPortfolioStock;
	}

}
