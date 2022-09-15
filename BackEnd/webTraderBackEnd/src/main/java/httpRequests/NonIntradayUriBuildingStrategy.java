package httpRequests;

import java.util.HashMap;
import java.util.Map;

import security.ApiKeys;

public class NonIntradayUriBuildingStrategy implements UriBuildingStrategy{
	Map<String,String> paramMap;
	public NonIntradayUriBuildingStrategy(Map<String,String> requestParamMap) {
		paramMap = new HashMap<String,String>();
		paramMap.putAll(requestParamMap);
	}
	@Override
	public String formUri() {
		String uri = String.format("https://www.alphavantage.co/query?function=%1$s&symbol=%2$s&apikey=%3$s",
				(new Object[] {paramMap.get("function"),paramMap.get("symbol"),ApiKeys.getAlphaVantageKey()}));
		System.out.println(uri);
		return uri;
	}
	@Override
	public void changeSymbol(String newSymbol) {
		paramMap.remove("symbol");
		paramMap.put("symbol", newSymbol);
	}
}
