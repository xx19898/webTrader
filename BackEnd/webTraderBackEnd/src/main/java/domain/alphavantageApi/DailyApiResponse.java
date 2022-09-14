package domain.alphavantageApi;

import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.adjustedClasses.AdjustedDailyMetaDataPart;
import domain.alphavantageApi.baseClasses.BaseNormalApiResponse;
import lombok.Data;

@Data
public class DailyApiResponse extends BaseNormalApiResponse implements StockApiResponse{
	@JsonProperty("Meta Data")
	AdjustedDailyMetaDataPart metaData;

	@Override
	public StockApiResponse getData() {
		return this;
	}
}
