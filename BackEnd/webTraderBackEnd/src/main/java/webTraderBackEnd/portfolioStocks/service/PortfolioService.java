package webTraderBackEnd.portfolioStocks.service;

import java.util.List;
import java.util.Set;

import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioAndStockDealsDTO;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

interface PortfolioService{
	public Set<StockDealDTO> getStockDeals(long id);
	public Set<StockDealDTO> addStockDeal(StockDealDTO newDeal, long userId);
	
	public PortfolioDTO getPortfolioDTOByUserId(long userId);
	public PortfolioDTO getPortfolioDTOByPortfolioId(long portfolioId);
	
	public PortfolioDTO implementSellingOperation(String symbol,int quantity,double price,long userId);
	public PortfolioDTO implementBuyingOperation(String symbol,int quantity,double price,long userId);
}
