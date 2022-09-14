package domain.alphavantageApi.baseClasses;

import domain.alphavantageApi.StockApiResponse;

public class CommonBaseApiResponse implements StockApiResponse{
	@Override
	public StockApiResponse getData() {
		return this;
	}
}
