package httpRequests;

import stockRequestProcessing.StockRequest;

public interface UriBuildingService{
	public String buildUri(StockRequest request);
}
