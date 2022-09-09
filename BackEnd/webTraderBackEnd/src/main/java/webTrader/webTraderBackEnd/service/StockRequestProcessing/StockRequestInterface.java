package webTrader.webTraderBackEnd.service.StockRequestProcessing;

import java.util.Map;

interface IStockRequest{
	StockRequestType typeOfRequest();
	Map<String,String> requestParameters();
}