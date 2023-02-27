package webTraderBackEnd.portfolioStocks.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MultiplePortfolioStocksWithSameNameException extends RuntimeException{
	
	public MultiplePortfolioStocksWithSameNameException(String message){
		super(message);
	}
}
