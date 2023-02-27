package webTraderBackEnd.portfolioStocks.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class StockDealNotFoundException extends RuntimeException{
	public StockDealNotFoundException(String message){
		super(message);
	}

}
