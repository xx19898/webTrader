package webTraderBackEnd.user.resource;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import webTraderBackEnd.messaging.service.MessagingService;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.PortfolioStock;
import webTraderBackEnd.user.dto.UserDTO;
import webTraderBackEnd.user.service.AdminService;
import webTraderBackEnd.user.service.UserService;

@RestController
@AllArgsConstructor
@RequestMapping(path="/admin")
@RolesAllowed("ROLE_ADMIN")
public class AdminResource{
	@Autowired
	private UserService userService;
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/allUserData")
	public @ResponseBody ResponseEntity<List<UserDTO>> getAllUsersData(){
		List<UserDTO> users = userService.getUsersData();
		
		return new ResponseEntity<List<UserDTO>>(users,HttpStatus.OK);
	}
	
	@GetMapping("/portfolio")
	public @ResponseBody ResponseEntity<Portfolio> getPortfolio(@RequestParam String username){
		Portfolio portfolio = userService.getUserPortfolio(username);
		return new ResponseEntity<Portfolio>(portfolio,HttpStatus.OK);
	}
	
	//create "/createPortfolio" endpoint and implement all the related functionality
	@PostMapping("/createPortfolio")
	public @ResponseBody ResponseEntity createPortfolio(@RequestBody Map<String,String> values){
		int userId = Integer.parseInt(values.get("userId"));
		double balance = Double.parseDouble(values.get("balance"));
		userService.createUserPortfolio(userId, balance);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@PatchMapping("changeDealStatus")
	public @ResponseBody ResponseEntity approveDeal(@RequestBody Map<String, String> values) throws Exception{
		int id = Integer.parseInt(values.get("id"));
		String newStatus = values.get("newStatus") == "APPROVED" ? "APPROVED" : "DISAPPROVED";
		if(newStatus == "APPROVED"){
			adminService.fulfillStockDeal(id);
			adminService.approveStockDeal(id);
		}else{
			adminService.disapproveStockDeal(id);
		}
		return new ResponseEntity(HttpStatus.OK);
	}
}
