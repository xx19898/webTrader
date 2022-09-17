package webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.StockApiResponse;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseAdjustedApiResponse;

@Data
public class AdjustedWeeklyApiResponse extends BaseAdjustedApiResponse implements StockApiResponse{
	@JsonProperty("Meta Data")
	AdjustedWeeklyMetaDataPart metaData;
}
