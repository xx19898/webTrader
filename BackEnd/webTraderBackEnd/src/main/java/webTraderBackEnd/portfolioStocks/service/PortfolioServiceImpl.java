package webTraderBackEnd.portfolioStocks.service;

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
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtoConverters.PortfolioDTOConverter;
import webTraderBackEnd.portfolioStocks.dtoConverters.StockDealDTOConverter;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioAndStockDealsDTO;
import webTraderBackEnd.portfolioStocks.dtos.PortfolioDTO;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;
import webTraderBackEnd.portfolioStocks.exceptions.NotEnoughFundsException;
import webTraderBackEnd.portfolioStocks.exceptions.PortfolioStockNotFound;
import webTraderBackEnd.portfolioStocks.repository.PortfolioRepository;
import webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy.BuyStockDealApprovementStrategy;
import webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy.SellStockDealApprovementStrategy;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;
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
	private StockDealDTOConverter stockDealDTOConverter;
	
	@Autowired
	private PortfolioDTOConverter portfolioDTOConverter;
	
	@Autowired 
	private BuyStockDealApprovementStrategy buyStockDealApprovementStrategy;
	
	@Autowired
	private SellStockDealApprovementStrategy sellStockDealApprovementStrategy;
	
	@Override
	public PortfolioDTO implementBuyingOperation(String symbol, int quantity, double price, long userId){
		User user = userService.getUser(userId);
		Portfolio portfolio = user.getPortfolio();
		if(portfolio.getBalance() < quantity * price) throw new NotEnoughFundsException("Not enough funds to finish the transaction");
		portfolio.implementBuyingOperation(symbol, quantity, price);
		return portfolioDTOConverter.convert(portfolio);
	}
	
	@Override
	public PortfolioDTO implementSellingOperation(String symbol, int quantity, double price, long userId){
		User user = userService.getUser(userId);
		Portfolio portfolio = user.getPortfolio();
		
		if(portfolio.getAmountOfStockInsidePortfolio(symbol) < quantity) throw new PortfolioStockNotFound();
		
		portfolio.implementBuyingOperation(symbol,quantity,price);
		return portfolioDTOConverter.convert(portfolio);
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
	public PortfolioDTO getPortfolioDTOByUserId(long userId) {
		Portfolio portfolio = userService.getUser(userId).getPortfolio();
		PortfolioDTO portfolioDTO = portfolioDTOConverter.convert(portfolio);
		return portfolioDTO;
	}
	
	
}
