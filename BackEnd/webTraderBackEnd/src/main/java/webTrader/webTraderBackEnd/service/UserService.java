package webTrader.webTraderBackEnd.service;

import java.util.List;

import webTrader.webTraderBackEnd.domain.Role;
import webTrader.webTraderBackEnd.domain.User;

public interface UserService {
	User saveUser(User user);
	Role saveRole(Role role);
	void addRoleToUser(String username, String roleName) throws Exception;
	User getUser(String username);
	User getUser(long id);
	List<User> getUsers();

}
