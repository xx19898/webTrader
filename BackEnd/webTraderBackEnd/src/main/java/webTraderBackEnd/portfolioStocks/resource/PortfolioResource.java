package webTraderBackEnd.portfolioStocks.resource;

import java.security.Principal;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.service.PortfolioServiceImpl;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.service.UserService;

@RestController
@RequestMapping(path="/portfolio")
@RolesAllowed("ROLE_USER")
@AllArgsConstructor
public class PortfolioResource{
	@Autowired
	private UserService userService;

	/*
	@Autowired
	private  portfolioService;
	
	
	@GetMapping(path="/getPortfolio")
	public Portfolio getPortfolio(Principal user){
		
	}
	*/
	
	@PatchMapping(path="/cancelStockDeal")
	  public @ResponseBody ResponseEntity<StockDeal> removeStockDeal(@RequestBody Map<String, Long> requestData){
		  Long userId= requestData.get("stockDealId");
		  System.out.println("trying to cancel stock deal of user with id " + userId);
		  if(userId == null) return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		  return new ResponseEntity<StockDeal>(HttpStatus.ACCEPTED);
   }
	
	/*
	@PostMapping(path="/addAStockDeal")
	  public @ResponseBody ResponseEntity<Void> addNewStockDealToAUser(@RequestBody StockDeal stockDeal){
		  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		  Long userIdentity = Long.parseLong((String) authentication.getPrincipal());
		  userService.addStockDeal(userIdentity,stockDeal.getSymbol(), stockDeal.getQuantity(), stockDeal.getStockPriceAtTheAcquirement(),stockDeal.getOperationType());
		  return new ResponseEntity<Void>(HttpStatus.OK);
	  }
	*/
	  
	  @GetMapping(path="/getStockDeals")
	  public @ResponseBody ResponseEntity<Set<StockDeal>> getStockDealsBelongingToUser(){
		  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		  User user = userService.getUser(Long.parseLong(authentication.getName()));
		  return new ResponseEntity<Set<StockDeal>>(user.getStockDeals(),HttpStatus.OK);
	  }	
}
