package webTraderBackEnd.portfolioStocks.dtoConverters;

import org.springframework.stereotype.Component;

import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioStockDTO;

@Component
public class PortfolioStockDTOConverter{
	
	public PortfolioStockDTO convert(PortfolioStock portfolioStock){
		return new PortfolioStockDTO(
				portfolioStock.getPortfolio().getUser().getId(),
				portfolioStock.getSymbol(),
				portfolioStock.getId(),
				portfolioStock.getPriceAtAcquirement(),
				portfolioStock.getQuantity()
				);
				
	}

}
