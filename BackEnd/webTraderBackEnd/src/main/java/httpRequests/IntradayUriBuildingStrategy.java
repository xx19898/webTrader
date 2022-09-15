package httpRequests;

import java.util.HashMap;
import java.util.Map;

import security.ApiKeys;

public class IntradayUriBuildingStrategy implements UriBuildingStrategy {
	private final Map<String, String> paramMap;
	
	public IntradayUriBuildingStrategy(Map<String,String> paramMap) {
		this.paramMap = paramMap;			
	}
	
	@Override
	public String formUri() {
		String uri =  String.format("https://www.alphavantage.co/query?function=%1$s&symbol=%2$s&interval=%3$s&apikey=%4$s",
				(new Object[]{
						paramMap.get("function"),paramMap.get("symbol"),paramMap.get("interval"),
						ApiKeys.getAlphaVantageKey()
						}));
		System.out.println(uri);
		return uri;
	}
	
	@Override
	public void changeSymbol(String newSymbol) {
		paramMap.remove("symbolName");
		paramMap.put("symbolName", newSymbol);
	}
}
