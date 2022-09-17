package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import java.util.Map;

import webTraderBackEnd.stocksRequests.utility.StockApiTimeSeries;

interface IStockRequest{
	StockRequestType typeOfRequest();
	Map<String,String> requestParameters();
}