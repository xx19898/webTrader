package webTraderBackEnd.stocksRequests.domain.alphavantageApi.intradayClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseSingleDataEntry;

@Data
public class IntradaySingleDataEntry extends BaseSingleDataEntry{
	@JsonProperty("5. volume")
	Double volume;
	

}
