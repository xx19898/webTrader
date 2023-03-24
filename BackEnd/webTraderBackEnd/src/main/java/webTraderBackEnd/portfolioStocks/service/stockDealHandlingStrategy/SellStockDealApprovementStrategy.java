package webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;
import webTraderBackEnd.portfolioStocks.repository.PortfolioRepository;
import webTraderBackEnd.portfolioStocks.repository.StockDealRepository;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;

@AllArgsConstructor
@Transactional
@Component
public class SellStockDealApprovementStrategy implements StockDealApprovementStrategy{
	@Autowired
	private StockDealRepository stockDealRepo;
	
	@Autowired
	private PortfolioRepository portfolioRepository;
	
	@Autowired
	private UserRepo userRepo;
	
	@Override
	public void implement(StockDealDTO stockDealDTO) {
		if(!stockDealDTO.getDealStatus().equals("APPROVED")){
			Optional<StockDeal> stockDealOptional = stockDealRepo.findById(stockDealDTO.getId());
			if(stockDealOptional.isEmpty()) throw new EntityNotFoundException();
			StockDeal stockDeal = stockDealOptional.get();
			stockDeal.setDealStatus(stockDealDTO.getDealStatus());
		}
		User user = retrieveUser(stockDealDTO.getUserId());
		user.getPortfolio().removeStock(stockDealDTO.getSymbol(), stockDealDTO.getQuantity()); 
	}
	
	private User retrieveUser(long id){
		Optional<User> userOptional = userRepo.findById(id);
		if(userOptional.isEmpty()) throw new UserNotFoundException("");
		return userOptional.get();
	}

}
