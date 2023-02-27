package webTraderBackEnd.user.resource;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.management.relation.RoleNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.service.UserService;
import webTraderBackEnd.user.service.UserServiceImpl;

@RestController // This means that this class is a Controller
@RequestMapping(path="/users")
public class UserResource {
  @Autowired 
  private UserServiceImpl userService;
  
  
  //For adding users via for example admin tab, not registering them 
  @PostMapping(path="/add") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<String> addNewUser (@RequestBody User newUser) throws RoleNotFoundException {
    userService.createNewUser(newUser);
    return new ResponseEntity<String>(String.format("User with name %s",newUser.getUsername()),HttpStatus.OK);
  }
  
  @PostMapping(path="/addAStockDeal")
  public @ResponseBody ResponseEntity<Void> addNewStockDealToAUser(@RequestBody StockDeal stockDeal){
	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	  System.out.println(stockDeal.getId());
	  System.out.println(stockDeal.getSymbol());
	  System.out.println(stockDeal.getQuantity());
	  System.out.println(stockDeal.getStockPriceAtTheAcquirement());
	  System.out.println(stockDeal.getOperationType());
	  Long userIdentity = Long.parseLong((String) authentication.getPrincipal());
	  userService.addStockDeal(userIdentity,stockDeal.getSymbol(), stockDeal.getQuantity(), stockDeal.getStockPriceAtTheAcquirement(),stockDeal.getOperationType());
	  return new ResponseEntity<Void>(HttpStatus.OK);
  }
  
  @GetMapping(path="/getStockDeals")
  public @ResponseBody ResponseEntity<Set<StockDeal>> getStockDealsBelongingToUser(){
	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	  User user = userService.getUser(Long.parseLong(authentication.getName()));
	  return new ResponseEntity<Set<StockDeal>>(user.getStockDeals(),HttpStatus.OK);
  }
  
  @PatchMapping(path="/cancelStockDeal")
  public @ResponseBody ResponseEntity<StockDeal> removeStockDeal(@RequestBody Map<String, Long> requestData){
	  Long userId= requestData.get("stockDealId");
	  System.out.println("trying to cancel stock deal of user with id " + userId);
	  if(userId == null) return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
	  StockDeal changedStockDeal = userService.cancelStockDeal(userId);
	  return new ResponseEntity<StockDeal>(HttpStatus.ACCEPTED);
  }
  
}