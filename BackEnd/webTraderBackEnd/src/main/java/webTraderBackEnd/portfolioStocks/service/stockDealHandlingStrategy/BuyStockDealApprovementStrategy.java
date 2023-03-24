package webTraderBackEnd.portfolioStocks.service.stockDealHandlingStrategy;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;
import webTraderBackEnd.portfolioStocks.exceptions.NotEnoughFundsException;
import webTraderBackEnd.portfolioStocks.repository.PortfolioRepository;
import webTraderBackEnd.portfolioStocks.repository.StockDealRepository;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.UserRepo;

@Transactional
@Component
public class BuyStockDealApprovementStrategy implements StockDealApprovementStrategy{
	@Autowired
	private StockDealRepository stockDealRepo;
	
	@Autowired
	private PortfolioRepository portfolioRepository;
	
	@Autowired
	private UserRepo userRepo;
	
	@Override
	public void implement(StockDealDTO stockDealDTO){
		if(stockDealDTO.getDealStatus().equals("DISAPPROVED") || stockDealDTO.getDealStatus().equals("CANCELLED")){
			Optional<StockDeal> stockDealOptional =  stockDealRepo.findById(stockDealDTO.getId());
			if(stockDealOptional.isEmpty()) throw new EntityNotFoundException("Stock Deal not found");
			stockDealOptional.get().setDealStatus(stockDealDTO.getDealStatus());
		}else{
			Optional<User> userOptional = userRepo.findById(stockDealDTO.getUserId());
			if(userOptional.isEmpty()) throw new UserNotFoundException("User not found");
			Portfolio portfolio = userOptional.get().getPortfolio();
			
			double totalPrice = stockDealDTO.getStockPriceAtTheAcquirement() * stockDealDTO.getQuantity();
			if(totalPrice > portfolio.getBalance()) throw new NotEnoughFundsException("Not enough money on the balance to finish the transaction");
			portfolio.setBalance(portfolio.getBalance() - totalPrice);
		}
	}
}
