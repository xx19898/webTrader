package webTraderBackEnd.user.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.exceptions.StockDealNotFoundException;
import webTraderBackEnd.portfolioStocks.repository.StockDealRepository;
import webTraderBackEnd.portfolioStocks.service.PortfolioService;
import webTraderBackEnd.user.domain.User;


@Service 
@Transactional
@AllArgsConstructor
public class AdminServiceImpl  implements AdminService{
	
	@Autowired
	private final StockDealRepository stockDealRepo;
	
	@Autowired
	PortfolioService portfolioService;
	
	
	private void stockDealRootMethod(boolean approvalValue,long id) throws Exception{
		Optional<StockDeal> stockDealToApproveOptionalWrapper = stockDealRepo.findById(id);
		if(stockDealToApproveOptionalWrapper.isEmpty()) {
			throw new UsernameNotFoundException("user not found");
		}
		StockDeal stockDealToApprove = stockDealToApproveOptionalWrapper.get();
		if(approvalValue){
			stockDealToApprove.setDealStatus("APPROVED");
		}else{
			stockDealToApprove.setDealStatus("DISAPPROVED");
		}
		fulfillStockDeal(id);
	}
	
	@Override
	public void approveStockDeal(long id) throws Exception{
		stockDealRootMethod(true, id);
	}
	
	@Override
	public void disapproveStockDeal(long id) throws Exception{
		stockDealRootMethod(false, id);
	}
	
	@Override
	public void fulfillStockDeal(long id) throws StockDealNotFoundException{
		Optional<StockDeal> stockDealWrapper = stockDealRepo.findById(id);
		if(stockDealWrapper.isEmpty()) throw new StockDealNotFoundException();
		StockDeal theStockDeal = stockDealWrapper.get();
		User user = theStockDeal.getUser();
		Portfolio thePortfolio = user.getPortfolio();
		if(theStockDeal.getOperationType().equals("BUY")){
			System.out.println(theStockDeal.getOperationType());
			portfolioService.implementBuyingOperation(theStockDeal.getSymbol(), theStockDeal.getQuantity(), theStockDeal.getStockPriceAtTheAcquirement(),user);
			theStockDeal.setDealStatus("APPROVED");
		}else{
			System.out.println(theStockDeal.getOperationType());
			System.out.println("NOW SELLING!");
			portfolioService.implementSellingOperation(theStockDeal.getSymbol(), theStockDeal.getQuantity(), theStockDeal.getStockPriceAtTheAcquirement(),user);
			theStockDeal.setDealStatus("APPROVED");
		}}
}

