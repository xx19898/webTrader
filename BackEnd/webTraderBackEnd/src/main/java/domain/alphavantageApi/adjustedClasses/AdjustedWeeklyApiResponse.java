package domain.alphavantageApi.adjustedClasses;


import com.fasterxml.jackson.annotation.JsonProperty;

import domain.alphavantageApi.StockApiResponse;
import domain.alphavantageApi.baseClasses.BaseAdjustedApiResponse;
import lombok.Data;

@Data
public class AdjustedWeeklyApiResponse extends BaseAdjustedApiResponse implements StockApiResponse{
	@JsonProperty("Meta Data")
	AdjustedWeeklyMetaDataPart metaData;
}
