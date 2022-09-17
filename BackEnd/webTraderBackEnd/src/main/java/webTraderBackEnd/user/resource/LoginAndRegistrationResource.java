package webTraderBackEnd.user.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.service.UserServiceImpl;

@RestController
public class LoginAndRegistrationResource {
	@Autowired
	private UserServiceImpl userService;
	
	LoginAndRegistrationResource
	       (UserServiceImpl userService,
			ObjectMapper jsonObjectMapper
			){
		this.userService = userService;
	}
	
	@PostMapping(path="/register")
	public @ResponseBody ResponseEntity<String> register(@RequestBody User newUser){
		userService.createNewUser(newUser);
		return new ResponseEntity<String>(String.format("User %s has successfully been created",newUser.getUsername()),HttpStatus.OK);
		
	}

}
