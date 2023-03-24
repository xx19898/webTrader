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
import webTraderBackEnd.portfolioStocks.repository.PortfolioRepository;
import webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy.BuyStockDealApprovementStrategy;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;

@Transactional
@Service
@AllArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
	
	@Autowired
	private UserRepo userRepo;
	
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
	public Set<StockDealDTO> addStockDeal(StockDealDTO newDeal,long userId){
		Optional<User> userOptional = userRepo.findById(userId);
		if(userOptional.isEmpty()) throw new UserNotFoundException("Sought user not found"); 
		User user = userOptional.get();
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
	public PortfolioAndStockDealsDTO dealWithStockDeal(StockDeal finalizedStockDeal){
		
	}
	
	@Override
	public PortfolioDTO getPortfolioByPortfolioId(long id){
		Optional<Portfolio> portfolioOptional = portfolioRepo.findById(id);
		if(portfolioOptional.isPresent()) return portfolioDTOConverter.convert(portfolioOptional.get());
		else{
			throw new EntityNotFoundException("Portfolio not found");
		}
	}
	
	@Override
	public Set<StockDealDTO> getStockDeals(long id) {
		Optional<User> userOptional = userRepo.findById(id);
		if(userOptional.isEmpty()) throw new UserNotFoundException("User not found");
		return userOptional.get().getStockDeals().stream().map(stockDeal -> stockDealDTOConverter.convert(stockDeal)).collect(Collectors.toSet());
	}	
}
