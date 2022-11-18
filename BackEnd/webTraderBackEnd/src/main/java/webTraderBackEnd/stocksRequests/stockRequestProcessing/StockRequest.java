package webTraderBackEnd.stocksRequests.stockRequestProcessing;

import java.util.Map;

public class StockRequest implements IStockRequest{
	private final StockRequestType type;
	private final Map<String,String> parameters;
	
	public StockRequest(Map<String,String> paramsMap){
		String functionName = paramsMap.get("function");
		if(functionName.equals("TIME_SERIES_INTRADAY")){
			this.type = StockRequestType.INTRADAY;
		}else{
			this.type = StockRequestType.NON_INTRADAY;
		}
		this.parameters = paramsMap;
	}
	
	@Override
	public Map<String, String> requestParameters(){
		return this.parameters;
	}

	@Override
	public StockRequestType typeOfRequest(){
		return this.type;
	}

}
