package stockRequestProcessing;

import java.util.Map;

interface IStockRequest{
	StockRequestType typeOfRequest();
	Map<String,String> requestParameters();
}