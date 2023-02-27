package webTraderBackEnd.portfolioStocks.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PortfolioStockNotFound extends RuntimeException{
	public PortfolioStockNotFound(String message) {
		super(message);
	}
}
