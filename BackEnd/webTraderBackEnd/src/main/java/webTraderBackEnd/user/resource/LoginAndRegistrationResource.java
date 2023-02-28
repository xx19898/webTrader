package webTraderBackEnd.user.resource;

import java.net.PasswordAuthentication;

import javax.management.relation.RoleNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.fasterxml.jackson.databind.ObjectMapper;

import webTraderBackEnd.security.CustomAuthenticationProvider;
import webTraderBackEnd.user.domain.LoginCredentials;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.service.UserServiceImpl;

@RestController
public class LoginAndRegistrationResource {
	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	private CustomAuthenticationProvider authProvider;
	
	LoginAndRegistrationResource
	       (UserServiceImpl userService,
			ObjectMapper jsonObjectMapper
			){
		this.userService = userService;
	}
	
	@PostMapping(path="/register")
	public @ResponseBody ResponseEntity<String> register(@RequestBody User newUser) throws RoleNotFoundException{
		System.out.println("CREATING NEW USER");
		userService.createNewUser(newUser);
		return new ResponseEntity<String>(String.format("User %s has successfully been created",newUser.getUsername()),HttpStatus.OK);
	}
}
