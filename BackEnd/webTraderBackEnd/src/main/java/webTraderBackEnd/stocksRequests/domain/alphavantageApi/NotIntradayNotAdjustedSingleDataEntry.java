package webTraderBackEnd.stocksRequests.domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseSingleDataEntry;

@Data
public class NotIntradayNotAdjustedSingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. volume")
	Double volume;
}
