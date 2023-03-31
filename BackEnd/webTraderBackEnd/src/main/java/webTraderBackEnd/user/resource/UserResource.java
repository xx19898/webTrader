package webTraderBackEnd.user.resource;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.management.relation.RoleNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

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
import webTraderBackEnd.user.dto.AdminDTO;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;
import webTraderBackEnd.user.service.UserService;
import webTraderBackEnd.user.service.UserServiceImpl;

@RestController 
@RequestMapping(path="/users")
public class UserResource {
  @Autowired 
  private UserServiceImpl userService;
  
  
  @PostMapping(path="/add")
  public @ResponseBody ResponseEntity<String> addNewUser (@RequestBody User newUser) throws RoleNotFoundException {
    userService.createNewUser(newUser);
    return new ResponseEntity<String>(String.format("User with name %s",newUser.getUsername()),HttpStatus.OK);
  }
  
  @GetMapping(path="/getAdmins")
  public @ResponseBody ResponseEntity<Set<AdminUsernameAndId>> getAdmins(){
	  return new ResponseEntity<Set<AdminUsernameAndId>>(userService.getAdmins(),HttpStatus.OK);
  }
  
  @GetMapping(path="/logout")
  public @ResponseBody ResponseEntity<Void> logout(HttpServletResponse response){
	Cookie cookie = new Cookie("refresh_cookie", null);
	cookie.setMaxAge(0);
	cookie.setSecure(true);
	cookie.setHttpOnly(true);
	cookie.setPath("/");
	response.addCookie(cookie);
	return new ResponseEntity(HttpStatus.OK);
  }
}