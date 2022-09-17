package webTraderBackEnd.stocksRequests.uriBuildingStrategy;

import java.util.Map;

public interface UriBuildingStrategy {
	String formUri();
	void changeSymbol(String newSymbol);
}
//TODO: Error happens when parsing an uri string, FIX IT!