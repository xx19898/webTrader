package webTraderBackEnd.stocksRequests.stockRequestProcessing;

public class StockRequestHandlerChainException extends Exception{
	private static final long serialVersionUID = -4377528475756219742L;

	public StockRequestHandlerChainException(String errorMessage) {
		super(errorMessage);
	}

}
