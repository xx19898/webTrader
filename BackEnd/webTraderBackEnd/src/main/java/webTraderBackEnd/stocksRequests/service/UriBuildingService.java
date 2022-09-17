package webTraderBackEnd.stocksRequests.service;

import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequest;

public interface UriBuildingService{
	public String buildUri(StockRequest request);
}
