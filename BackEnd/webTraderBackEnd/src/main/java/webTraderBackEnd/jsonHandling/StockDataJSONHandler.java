package webTraderBackEnd.jsonHandling;

import java.util.Map;

import org.json.JSONException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import domain.alphavantageApi.IntradayStockApiResponse;
import domain.alphavantageApi.NotIntradayNotAdjustedApiResponse;

public interface StockDataJSONHandler {
	public NotIntradayNotAdjustedApiResponse parseNonIntradayApiResponse(String jsonString) throws JsonMappingException, JsonProcessingException;
	public IntradayStockApiResponse parseIntradayApiResponse(String jsonString) throws JsonMappingException, JsonProcessingException;
}
