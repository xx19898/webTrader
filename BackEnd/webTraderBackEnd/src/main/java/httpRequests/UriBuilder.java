package httpRequests;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import stockRequestProcessing.StockRequest;
import utility.StockApiTimeSeries;
import utility.StringToStockApiTimeSeriesMapper;

@Component
@NoArgsConstructor
public class UriBuilder implements UriBuildingService{
	UriBuildingStrategy uriBuildingStrategy;
	
	@Autowired
	StringToStockApiTimeSeriesMapper stringToTimeSeriesConverter;

	@Override
	public String buildUri(StockRequest request){
		Map<String,String> requestParameters = request.requestParameters();
		String timeSeriesString = requestParameters.get("Time Series");
		StockApiTimeSeries timeSeriesOfTheRequest = stringToTimeSeriesConverter.mapStringToStockApiTimeSeriesEnum(timeSeriesString);
		if(timeSeriesOfTheRequest.equals(StockApiTimeSeries.TIME_SERIES_INTRADAY)){
			setUriBuildingStrategy(new IntradayUriBuildingStrategy(requestParameters));
			return this.uriBuildingStrategy.formUri();
		}
		setUriBuildingStrategy(new NonIntradayUriBuildingStrategy(requestParameters));
		return this.uriBuildingStrategy.formUri();
	}
	
	private void setUriBuildingStrategy(UriBuildingStrategy newUriBuildingStrategy){
		this.uriBuildingStrategy = newUriBuildingStrategy;
	}

}
