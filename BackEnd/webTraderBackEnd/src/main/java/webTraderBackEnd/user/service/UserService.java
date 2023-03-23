package webTraderBackEnd.user.service;

import java.util.List;
import java.util.Set;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;
import webTraderBackEnd.user.domain.Role;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.dto.AdminDTO;
import webTraderBackEnd.user.dto.UserDTO;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;

public interface UserService {
	
	User saveUser(User user);
	
	Role saveRole(Role role);
	void addRoleToUser(String username, String roleName) throws Exception;
	
	User getUser(String username);
	User getUser(long id);
	List<User> getUsers();
	Set<AdminUsernameAndId> getAdmins();
	
	List<UserDTO> getUsersData();
	
	Set<StockDeal> getStockDeals(String username);
	Portfolio getUserPortfolio(String username);
	
	void removeStockFromPortfolio(String username,String symbol,int quantity) throws Exception;
	void addStockToPortfolio(String username,String symbol,int quantity,double price) throws Exception;
	
	StockDeal cancelStockDeal(long id);
	void addStockDeal(Long id, String symbol, int quantity,double price,String operationType);
}
