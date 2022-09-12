package domain.alphavantageApi;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class IntradayStockApiResponse{
	
	@JsonProperty("Meta Data")
	IntradayMetaDataPart metaData;
	
	@JsonAlias({"Time Series (1min)","Time Series (5min)","Time Series (15min)"
	,"Time Series (30min)","Time Series (60min)"})
	Map<String,IntradaySingleDataEntry> theData;
	//TODO:Make it so that the name the object will be serialized under is "time series" not the data. Maybe with help of map or custom serialization
}
