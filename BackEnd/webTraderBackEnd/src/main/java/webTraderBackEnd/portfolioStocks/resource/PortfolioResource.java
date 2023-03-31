package webTraderBackEnd.portfolioStocks.resource;

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

import webTraderBackEnd.portfolioStocks.domain.StockDeal;

import webTraderBackEnd.portfolioStocks.dtos.StockDealDTO;

import webTraderBackEnd.portfolioStocks.service.PortfolioService;

import webTraderBackEnd.user.domain.User;

import webTraderBackEnd.user.service.UserService;

@RestController
@RequestMapping(path="/portfolio")
@RolesAllowed("ROLE_USER")
@AllArgsConstructor
public class PortfolioResource{
	@Autowired
	private UserService userService;
	
	@Autowired
	private PortfolioService portfolioService;
	
	@PostMapping(path="/createStockDeal")
	public @ResponseBody ResponseEntity<Void> createStockDeal(@RequestBody StockDealDTO newStockDeal){
		System.out.println(newStockDeal.getUserId());
		portfolioService.addStockDeal(newStockDeal, newStockDeal.getUserId());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PatchMapping(path="/cancelStockDeal")
    public @ResponseBody ResponseEntity<StockDeal> removeStockDeal(@RequestBody Map<String, Long> requestData){
		Long stockDealId = requestData.get("stockDealId");
		portfolioService.cancelStockDeal(stockDealId);
		return new ResponseEntity<StockDeal>(HttpStatus.ACCEPTED);
	}
	
    @GetMapping(path="/getStockDeals")
    public @ResponseBody ResponseEntity<Set<StockDeal>> getStockDealsBelongingToUser(){
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    User user = userService.getUser(Long.parseLong(authentication.getName()));
	    return new ResponseEntity<Set<StockDeal>>(user.getStockDeals(),HttpStatus.OK);
	    }
    }
