package webTraderBackEnd.stocksRequests.domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseMetaDataPart;

@Data
public class MetaDataPartDaily extends BaseMetaDataPart{
	@JsonProperty("4. Output Size")
	String outputSize;
	
	@JsonProperty("5. Time Zone")
	String timeZone;
}
