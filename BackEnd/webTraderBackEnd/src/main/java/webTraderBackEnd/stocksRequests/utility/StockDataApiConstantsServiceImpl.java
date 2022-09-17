package webTraderBackEnd.stocksRequests.utility;

public class StockDataApiConstantsServiceImpl implements StockDataApiConstantsService{
	private final int MAX_LIMIT_OF_STOCK_API_CALLS_PER_TIME_LIMIT;
	private final int TIME_LIMIT_IN_SECONDS;
	
	public StockDataApiConstantsServiceImpl(int MAX_LIMIT_OF_STOCK_API_CALLS_PER_TIME_LIMIT,
			int TIME_LIMIT_IN_SECONDS){
		this.MAX_LIMIT_OF_STOCK_API_CALLS_PER_TIME_LIMIT = MAX_LIMIT_OF_STOCK_API_CALLS_PER_TIME_LIMIT;
		this.TIME_LIMIT_IN_SECONDS = TIME_LIMIT_IN_SECONDS;
	}
	
	public int getMaxLimitOfStockApiCallsTimeLimit(){
		return this.MAX_LIMIT_OF_STOCK_API_CALLS_PER_TIME_LIMIT;
		}
	public int getTimeLimitInSeconds(){
		return this.TIME_LIMIT_IN_SECONDS;
		}
}
