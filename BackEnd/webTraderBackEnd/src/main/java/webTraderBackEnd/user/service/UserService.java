package webTraderBackEnd.user.service;

import java.util.List;

import webTraderBackEnd.user.domain.Role;
import webTraderBackEnd.user.domain.User;

public interface UserService {
	User saveUser(User user);
	Role saveRole(Role role);
	void addRoleToUser(String username, String roleName) throws Exception;
	User getUser(String username);
	User getUser(long id);
	List<User> getUsers();

}
