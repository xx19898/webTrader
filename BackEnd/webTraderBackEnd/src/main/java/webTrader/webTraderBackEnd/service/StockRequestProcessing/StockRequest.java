package webTrader.webTraderBackEnd.service.StockRequestProcessing;

import java.util.Map;

public class StockRequest implements IStockRequest{
	private final StockRequestType type;
	private final Map<String,String> parameters;
	
	public StockRequest(Map<String,String> paramsMap){
		String functionName = paramsMap.get("functionName");
		if(functionName.equals("intraday")) {
			this.type = StockRequestType.INTRADAY;
		}else{
			this.type = StockRequestType.NON_INTRADAY;
		}
		this.parameters = paramsMap;
	}
	
	@Override 
	public StockRequestType typeOfRequest(){
		return type;
	}
	
	@Override
	public Map<String, String> requestParameters() {
		return this.parameters;
	}

}
