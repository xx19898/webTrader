package webTrader.webTraderBackEnd.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import webTrader.webTraderBackEnd.domain.User;
import webTrader.webTraderBackEnd.repo.UserRepo;
import webTrader.webTraderBackEnd.service.UserService;
import webTrader.webTraderBackEnd.service.UserServiceImpl;

@RestController // This means that this class is a Controller
@RequestMapping(path="/users") // This means URL's start with /demo (after Application path)
public class UserResource {
  @Autowired 
  private UserServiceImpl userService;
  
  
  //For adding users via for example admin tab, not registering them 
  @PostMapping(path="/add") // Map ONLY POST Requests
  public @ResponseBody ResponseEntity<String> addNewUser (@RequestBody User newUser) {
    // @ResponseBody means the returned String is the response, not a view name
    // @RequestParam means it is a parameter from the GET or POST request
   
	
    userService.createNewUser(newUser);
  
    return new ResponseEntity<String>(String.format("User with name %s",newUser.getUsername()),HttpStatus.OK);
  }

  @GetMapping(path="/all")
  public @ResponseBody ResponseEntity<List<User>> getAllUsers(){
    // This returns a JSON or XML with the users
	  List<User> users = userService.getUsers();
	  
	  
    return new ResponseEntity<List<User>>(users, HttpStatus.OK);
  }
}