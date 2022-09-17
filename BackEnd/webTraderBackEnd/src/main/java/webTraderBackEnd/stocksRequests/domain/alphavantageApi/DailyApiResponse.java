package webTraderBackEnd.stocksRequests.domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.adjustedClasses.AdjustedDailyMetaDataPart;
import webTraderBackEnd.stocksRequests.domain.alphavantageApi.baseClasses.BaseNormalApiResponse;

@Data
public class DailyApiResponse extends BaseNormalApiResponse implements StockApiResponse{
	@JsonProperty("Meta Data")
	AdjustedDailyMetaDataPart metaData;

	@Override
	public StockApiResponse getData() {
		return this;
	}
}
