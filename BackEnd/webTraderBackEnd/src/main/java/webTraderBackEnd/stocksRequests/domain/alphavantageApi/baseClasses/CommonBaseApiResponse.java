package webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses;

import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;
import lombok.Data;

@Data
public class CommonBaseApiResponse implements StockApiResponse{
	@Override
	public StockApiResponse getData() {
		return this;
	}
}
