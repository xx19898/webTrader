package webTraderBackEnd.portfolioStocks.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtoConverters.PortfolioDTOConverter;
import webTraderBackEnd.portfolioStocks.dtoConverters.StockDealDTOConverter;

import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

import webTraderBackEnd.portfolioStocks.exceptions.NotEnoughFundsException;
import webTraderBackEnd.portfolioStocks.exceptions.PortfolioStockNotFound;

import webTraderBackEnd.portfolioStocks.repository.PortfolioRepository;
import webTraderBackEnd.portfolioStocks.repository.StockDealRepository;

import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.service.UserService;

@Transactional
@Service
@AllArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PortfolioRepository portfolioRepo;
	
	@Autowired
	private StockDealRepository stockDealRepository;
	
	@Autowired
	private StockDealDTOConverter stockDealDTOConverter;
	
	@Autowired
	private PortfolioDTOConverter portfolioDTOConverter;
	
	@Override
	public PortfolioDTO implementBuyingOperation(String symbol, int quantity, double price, User user){
		Portfolio portfolio = user.getPortfolio();
		if(portfolio.getBalance() < quantity * price) throw new NotEnoughFundsException("Not enough funds to finish the transaction");
		implementBuyingOperationConcrete(portfolio,symbol, quantity, price);
		return portfolioDTOConverter.convert(portfolio);
	}
	
	@Override
	public PortfolioDTO implementSellingOperation(String symbol, int quantity, double price, User user){
		Portfolio portfolio = user.getPortfolio();	
		if(portfolio.getAmountOfStockInsidePortfolio(symbol) < quantity) throw new PortfolioStockNotFound("Stock not found when trying to fulfill selling operation");
		implementBuyingOperationConcrete(portfolio,symbol,quantity,price);
		return portfolioDTOConverter.convert(portfolio);
	}
	
	private void changePortfolioBalance(String operationType,double totalSumOfOperation,Portfolio portfolio){
		if(operationType.equals("BUY")){
			portfolio.setBalance(portfolio.getBalance() - totalSumOfOperation);
		}else{
			portfolio.setBalance(portfolio.getBalance() + totalSumOfOperation);
		}
	}
	
	private void implementBuyingOperationConcrete(Portfolio portfolio,String symbol, int quantity,double price){
		if( portfolio.getBalance() < quantity * price ) throw new NotEnoughFundsException("Not enough funds to finish the transaction");
		
		changePortfolioBalance("BUY", price * quantity,portfolio);
		portfolio.addNewStock(new PortfolioStock(symbol, quantity, price, portfolio));
	}
	
	private void implementSellingOperationConcrete(Portfolio portfolio,String symbol, int quantity, double price){
		int amountOfSameStockInPortfolio = portfolio.getAmountOfStockInsidePortfolio(symbol);
		if(amountOfSameStockInPortfolio < quantity) throw new PortfolioStockNotFound();
		
		changePortfolioBalance("SELL", price * quantity,portfolio);
		removeStock(symbol, quantity,portfolio);
	}
	
	private void removeStock(String symbol,int quantity,Portfolio portfolio){
		
		List<PortfolioStock> portfolioStocksWithSameSymbol = portfolio.getPortfolioStocks()
				.stream()
				.filter(portfolioStock -> portfolioStock.getSymbol().equals(symbol))
				.collect(Collectors.toList());
		
		portfolioStocksWithSameSymbol.sort(new Comparator<PortfolioStock>(){
			@Override
			public int compare(PortfolioStock p1,PortfolioStock p2){
				if(p1.getPriceAtAcquirement() == p2.getPriceAtAcquirement()) {
					return 0;
				}else if(p1.getPriceAtAcquirement() < p2.getPriceAtAcquirement()){
					return -1;
				}else{
					return 1;
				}
			}
		});
		
		int stocksToRemove = quantity;
		int index = 0;
		while(stocksToRemove > 0){
			int currQuantity = portfolioStocksWithSameSymbol.get(index).getQuantity();
			if(currQuantity > stocksToRemove){
				portfolioStocksWithSameSymbol.get(index).setQuantity(currQuantity - stocksToRemove);
				stocksToRemove = 0;
			}else{
				portfolioStocksWithSameSymbol.get(index).setQuantity(0);
				stocksToRemove = stocksToRemove - currQuantity;
				index++;
			}
		}
		
		List<PortfolioStock> portfolioStocksWithoutSameSymbol = portfolio.getPortfolioStocks()
				.stream().filter(portfolioStock -> !portfolioStock.getSymbol().equals(symbol))
				.collect(Collectors.toList());
		
		portfolioStocksWithSameSymbol = portfolioStocksWithSameSymbol
				.stream()
				.filter(stock -> stock.getQuantity() != 0).collect(Collectors.toList());
		
		List<PortfolioStock> unitedList = new ArrayList<>();
		unitedList.addAll(portfolioStocksWithoutSameSymbol);
		unitedList.addAll(portfolioStocksWithSameSymbol);
		portfolio.setPortfolioStocks(unitedList
				.stream()
				.collect(Collectors.toSet()));
		}
	
	
	@Override
	public Set<StockDealDTO> addStockDeal(StockDealDTO newDeal,long userId){
		User user = userService.getUser(userId);
		user.addStockDeal(
				new StockDeal(
						newDeal.getSymbol(),
						newDeal.getDealStatus(),
						newDeal.getQuantity(),
						newDeal.getStockPriceAtTheAcquirement(),
						newDeal.getOperationType(),
						user));
		return user.getStockDeals().stream().map(stockDeal -> stockDealDTOConverter.convert(stockDeal)).collect(Collectors.toSet());
	}
	
	@Override
	public PortfolioDTO getPortfolioDTOByPortfolioId(long id){
		Optional<Portfolio> portfolioOptional = portfolioRepo.findById(id);
		if(portfolioOptional.isPresent()) return portfolioDTOConverter.convert(portfolioOptional.get());
		else{
			throw new EntityNotFoundException("Portfolio not found");
		}
	}
	
	@Override
	public Set<StockDealDTO> getStockDeals(long id){
		User user = userService.getUser(id);
		return user.getStockDeals().stream().map(stockDeal -> stockDealDTOConverter.convert(stockDeal)).collect(Collectors.toSet());
	}
	
	@Override
	public void cancelStockDeal(long id){
		StockDeal stockDeal = getStockDealById(id);
		stockDeal.cancelDeal();
	}
	
	@Override
	public StockDeal getStockDealById(long id){
		Optional<StockDeal> stockDeal = stockDealRepository.findById(null);
		if(stockDeal.isEmpty()) throw new EntityNotFoundException();
		return stockDeal.get();
	}

	@Override
	public PortfolioDTO getPortfolioDTOByUserId(long userId) {
		Portfolio portfolio = userService.getUser(userId).getPortfolio();
		PortfolioDTO portfolioDTO = portfolioDTOConverter.convert(portfolio);
		return portfolioDTO;
	}
	
	
}
