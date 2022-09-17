package webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.NotIntradayNotAdjustedSingleDataEntry;

@Data
public class BaseNormalApiResponse{
	@JsonAlias({"Monthly Time Series","Weekly Time Series","Time Series (Daily)"})
	Map<String,NotIntradayNotAdjustedSingleDataEntry> theData;
}
