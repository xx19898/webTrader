package webTraderBackEnd.stocksRequests.domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseMetaDataPart;

@Data
public class MetaDataPartWeeklyAndMonthly extends BaseMetaDataPart{
	@JsonProperty("4. Output Size")
    String outputSize;	
}
