package stockRequestProcessing;

import java.util.Map;

import utility.StockApiTimeSeries;

interface IStockRequest{
	StockRequestType typeOfRequest();
	Map<String,String> requestParameters();
}