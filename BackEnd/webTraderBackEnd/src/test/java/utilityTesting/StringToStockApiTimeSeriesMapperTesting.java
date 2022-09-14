package utilityTesting;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import utility.StockApiTimeSeries;
import utility.StringToStockApiTimeSeriesMapper;

@ExtendWith(SpringExtension.class)
@Import(StringToStockApiTimeSeriesMapper.class)
class StringToStockApiTimeSeriesMapperTesting {
	@Autowired 
	StringToStockApiTimeSeriesMapper stringToTimeSeriesMapper;
	
	@Test
	void testThatTheStringToStockApiTimeMappingWorksCorrectly(){
		String timeSeriesAsAString = "TIME_SERIES_DAILY";
		StockApiTimeSeries timeSeriesConstant = stringToTimeSeriesMapper.mapStringToStockApiTimeSeriesEnum(timeSeriesAsAString);
		System.out.println(timeSeriesConstant.toString());
		equals(timeSeriesAsAString.equals(timeSeriesConstant.toString()));
	}

}
