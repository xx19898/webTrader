package webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseMetaDataPart;

@Data
public class AdjustedMonthlyMetaDataPart extends BaseMetaDataPart{
	@JsonProperty("4. Time Zone")
	String timeZone;

}
