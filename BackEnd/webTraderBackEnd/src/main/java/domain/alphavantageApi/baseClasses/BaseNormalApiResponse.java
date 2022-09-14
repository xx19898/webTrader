package domain.alphavantageApi.baseClasses;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;

import domain.alphavantageApi.NotIntradayNotAdjustedSingleDataEntry;
import lombok.Data;

@Data
public class BaseNormalApiResponse{
	@JsonAlias({"Monthly Time Series","Weekly Time Series","Time Series (Daily)"})
	Map<String,NotIntradayNotAdjustedSingleDataEntry> theData;
}
