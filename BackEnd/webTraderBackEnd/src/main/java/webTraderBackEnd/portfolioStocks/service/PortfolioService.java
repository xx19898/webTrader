package webTraderBackEnd.portfolioStocks.service;
import java.util.Set;

import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;
import webTraderBackEnd.user.domain.User;

public interface PortfolioService{
	public Set<StockDealDTO> getStockDeals(long id);
	public Set<StockDealDTO> addStockDeal(StockDealDTO newDeal, long userId);
	public void cancelStockDeal(long id);
	public StockDeal getStockDealById(long id);
	
	public PortfolioDTO getPortfolioDTOByUserId(long userId);
	public PortfolioDTO getPortfolioDTOByPortfolioId(long portfolioId);
	
	public PortfolioDTO implementSellingOperation(String symbol,int quantity,double price,User user);
	public PortfolioDTO implementBuyingOperation(String symbol,int quantity,double price,User user);
}
