package webTraderBackEnd.stocksRequests.utility;

import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Component;

import antlr.collections.List;

//TODO: IMPLEMENT AND TEST THIS. THEN MODIFY JACKSONSTOCKHANDLER SO THAT IT TAKES IN JSON STRING
//AND STRING WITH NAME OF THE TIMESERIES. THEN HAVE TO TEST THE PARSING OF JSON DATA AND THEN FINALLY
//MODIFY THE REQUESTHANDLERS SO THAT THEY ALSO TAKE IN THE TIME SERIES IN STOCKREQUEST OBJECT
@Component
public class StringToStockApiTimeSeriesMapper{
	private <T> Collector<T, ?, T> toSingleton(){
	    return Collectors.collectingAndThen(
	            Collectors.toList(),
	            list -> {
	                if (list.size() != 1) {
	                    throw new IllegalStateException();
	                }
	                return list.get(0);
	            }
	    );
	}
	public StockApiTimeSeries mapStringToStockApiTimeSeriesEnum(String stringToMap){
		StockApiTimeSeries timeSeries = Stream.of(StockApiTimeSeries.values())
				.filter(timeSeriesConstant -> timeSeriesConstant.toString().equals(stringToMap))
				.collect(toSingleton());
		return timeSeries;
	}
}
