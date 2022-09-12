package webTraderBackEnd.jsonHandling;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import domain.alphavantageApi.IntradayStockApiResponse;
import domain.alphavantageApi.NotIntradayNotAdjustedApiResponse;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Component
public class JacksonStockDataJSONHandler implements StockDataJSONHandler{
	@Override
	public NotIntradayNotAdjustedApiResponse parseNonIntradayApiResponse(String jsonString) throws JsonMappingException, JsonProcessingException{
		ObjectMapper objectMapper = new ObjectMapper();
		NotIntradayNotAdjustedApiResponse parsedData = objectMapper.readValue(jsonString, NotIntradayNotAdjustedApiResponse.class);
		return parsedData;
	}

	@Override
	public IntradayStockApiResponse parseIntradayApiResponse(String jsonString) throws JsonMappingException, JsonProcessingException{
		ObjectMapper objectMapper = new ObjectMapper();
        IntradayStockApiResponse parsedData = objectMapper.readValue(jsonString, IntradayStockApiResponse.class);
		return parsedData;
	}
}
