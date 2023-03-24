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
	
	public PortfolioAndStockDealsDTO dealWithStockDeal(StockDeal finalizedStockDeal);
	
	public PortfolioDTO getPortfolioByUserId(long userId);
	public PortfolioDTO getPortfolioByPortfolioId(long portfolioId);
	
}
