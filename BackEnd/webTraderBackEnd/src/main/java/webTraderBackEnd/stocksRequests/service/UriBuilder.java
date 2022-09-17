package webTraderBackEnd.stocksRequests.service;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webTraderBackEnd.stocksRequests.uriBuildingStrategy.IntradayUriBuildingStrategy;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.NonIntradayUriBuildingStrategy;
import webTraderBackEnd.stocksRequests.uriBuildingStrategy.UriBuildingStrategy;
import lombok.NoArgsConstructor;
import webTraderBackEnd.stocksRequests.stockRequestProcessing.StockRequest;
import webTraderBackEnd.stocksRequests.utility.StockApiTimeSeries;
import webTraderBackEnd.stocksRequests.utility.StringToStockApiTimeSeriesMapper;

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
