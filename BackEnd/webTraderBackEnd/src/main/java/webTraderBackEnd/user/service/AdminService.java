package webTraderBackEnd.user.service;

import webTraderBackEnd.portfolioStocks.exceptions.StockDealNotFoundException;

public interface AdminService{
	void approveStockDeal(long id) throws Exception;
	void disapproveStockDeal(long id) throws Exception;
	void fulfillStockDeal(long id) throws StockDealNotFoundException;
}
