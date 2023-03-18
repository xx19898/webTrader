package webTraderBackEnd.user.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.management.relation.RoleNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import webTraderBackEnd.exceptionHandling.BadRequestException;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.portfolioStocks.exceptions.StockDealNotFoundException;
import webTraderBackEnd.portfolioStocks.repository.StockDealRepository;
import webTraderBackEnd.user.domain.Role;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.dto.UserDTO;
import webTraderBackEnd.user.dtoConverters.UserDTOConverter;
import webTraderBackEnd.user.exceptions.UserAlreadyExistsException;
import webTraderBackEnd.user.exceptions.UserNotFoundException;
import webTraderBackEnd.user.repository.RoleRepo;
import webTraderBackEnd.user.repository.UserInsertRepository;
import webTraderBackEnd.user.repository.UserRepo;

@AllArgsConstructor	
@Service @Transactional
public class UserServiceImpl implements UserService,UserDetailsService{
	
	@Autowired
	private final UserRepo userRepo;
	@Autowired
	private final RoleRepo roleRepo;
	@Autowired
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private final StockDealRepository stockDealRepo;
	@Autowired
	private final UserDTOConverter userDTOConverter;

	@Override
	public User saveUser(User user){
		User newUser = user;
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(newUser);
	}

	@Override
	public Role saveRole(Role role){
		return this.roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) throws Exception {
		Optional<User> userOptional = userRepo.findByUsername(username);
		Optional<Role> roleOptional = roleRepo.findByName(roleName);
		
		
		User user = userOptional.orElseThrow(() -> new UserNotFoundException("User to add role to not found"));
	}
	
	public void createNewUser(User user) throws RoleNotFoundException{
		User newUser = user;
		Optional<User> userOptional = userRepo.findByUsername(user.getUsername());
		Optional<Role> roleOptional = roleRepo.findByName("ROLE_USER");
		
		if(!userOptional.isEmpty()) {
			throw new UserAlreadyExistsException(user.getUsername());
		}
		if(roleOptional.isEmpty()) {
			throw new RoleNotFoundException("No such role found: /USER/");
		}
		
		Role newRole = roleOptional.get();
		List<Role> roleList = new ArrayList<Role>();
		roleList.add(newRole);
		newUser.setRoles(roleList);
		saveUser(newUser);
	}

	@Override
	public User getUser(String username){
		Optional<User> userOptional = userRepo.findByUsername(username);
		User user = userOptional.orElseThrow(
				() -> new UserNotFoundException
				("User you are trying to get is not found"));
		return user;
	}
	
	@Override
	public User getUser(long id) {
		Optional<User> userOptional = userRepo.findById(id);
		User user = userOptional.orElseThrow(
				() -> new UserNotFoundException
				("User you are trying to get is not found"));
		return user;
	}

	@Override
	public List<User> getUsers(){
		int LIMIT = 3;
		Page<User> page = userRepo.findAll(PageRequest.of(0, LIMIT, Sort.by(Sort.Order.asc("id"))));
		return page.getContent();
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException(String.format("Error. User %s is not found",username)));
		
		return user;
	}
	
	@Override
	public Set<StockDeal> getStockDeals(String username){
		Optional<User> user = userRepo.findByUsername(username);
		if(user.isEmpty()) throw new UserNotFoundException("User not found");
		return user.get().getStockDeals();
	}
	
	@Override
	public Portfolio getUserPortfolio(String username) {
		User user = getUser(username);
		return user.getPortfolio();
	}
	
	@Override
	public void addStockToPortfolio(String username, String symbol, int quantity,double price) throws Exception {
		User user = getUser(username);
		user.getPortfolio().addNewStock(symbol,quantity,price);
	}
	
	@Override
	public void removeStockFromPortfolio(String username, String symbol, int quantity) throws Exception{
		User user = getUser(username);
		user.getPortfolio().removeStock(symbol, quantity);
	}
	
	@Override
	public void addStockDeal(Long userId, String symbol, int quantity,double price, String operationType){
		User user = getUser(userId);
		if(StockDeal.operationTypeValueIsCorrect(operationType)){
			user.addStockDeal(new StockDeal(symbol,"PENDING" , quantity,price,operationType,user));
		}
		else {
			throw new BadRequestException("Operation Type is of unrecognized value");
		}
	}
	
	@Override
	public StockDeal cancelStockDeal(long id){
		Optional<StockDeal> theStockDeal = stockDealRepo.findById(id);
		if(theStockDeal.isPresent()){
			StockDeal stockDeal = theStockDeal.get();
			stockDeal.setDealStatus("CANCELLED");
			return stockDeal;
		}else{
			throw new StockDealNotFoundException();
		}
	}

	@Override
	public List<UserDTO> getUsersData() {
		Iterable<User> users = userRepo.findAll();
		List<UserDTO> usersDto = new ArrayList<UserDTO>();
		for(User user : users){
			usersDto.add(userDTOConverter.convert(user));
		}
		return usersDto;
	}
}
