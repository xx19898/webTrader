package webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy;

import webTraderBackEnd.portfolioStocks.dtoConverters.StockDealDTOConverter;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

public interface StockDealApprovementStrategy{
	public void implement(StockDealDTO stockDealDTO);
}
