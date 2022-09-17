package webTraderBackEnd.utility;

public final class Constants {
	// AlphaVantage API
	private Constants() {
		
	}
	
	private final static int MAX_LIMIT_OF_STOCK_API_CALLS_PER_MINUTE = 5;
	private final static int TIME_LIMIT_IN_SECONDS = 60;
	
	
	public static int getTimeLimitInSeconds(){
		return TIME_LIMIT_IN_SECONDS;
		}
	
	public static int getMaxLimitOfStockApiCallsPerMinute(){
		return MAX_LIMIT_OF_STOCK_API_CALLS_PER_MINUTE;
		}
}
