package webTrader.webTraderBackEnd.service;


import java.util.List;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import webTrader.webTraderBackEnd.domain.Role;
import webTrader.webTraderBackEnd.domain.User;
import webTrader.webTraderBackEnd.exceptions.User.UserAlreadyExistsException;
import webTrader.webTraderBackEnd.exceptions.User.UserNotFoundException;
import webTrader.webTraderBackEnd.repo.RoleRepo;
import webTrader.webTraderBackEnd.repo.UserRepo;


@Service @Transactional
public class UserServiceImpl implements UserService,UserDetailsService{
	
	@Autowired
	private final UserRepo userRepo;
	@Autowired
	private final RoleRepo roleRepo;
	@Autowired
	private final PasswordEncoder passwordEncoder;
	
	
	UserServiceImpl(
			UserRepo userRepo,
			RoleRepo roleRepo,
			PasswordEncoder passwordEncoder
			)
	{
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.passwordEncoder = passwordEncoder;
		
	}

	@Override
	public User saveUser(User user) {
		User newUser = user;
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(newUser);
	}

	@Override
	public Role saveRole(Role role) {
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) throws Exception {
		Optional<User> userOptional = userRepo.findByUsername(username);
		Optional<Role> roleOptional = roleRepo.findByName(roleName);
		
		
		User user = userOptional.orElseThrow(() -> new UserNotFoundException("User to add role to not found"));
	}
	
	public void createNewUser(User user) {
		//Checking whether the user with the same name already exists in the database
		Optional<User> userOptional = userRepo.findByUsername(user.getUsername());
		if(!userOptional.isEmpty()) {
			throw new UserAlreadyExistsException(user.getUsername());
		}
		saveUser(user);
			
		
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
	public List<User> getUsers() {
		int LIMIT = 3;
		Page<User> page = userRepo.findAll(PageRequest.of(0, LIMIT, Sort.by(Sort.Order.asc("id"))));
		return page.getContent();
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException(String.format("Error. User %s is not found",username)));
		
		
		//Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		//user.getRoles().forEach(
		//		role -> {
		//			authorities.add(new SimpleGrantedAuthority(role.getName()));
		//		});
		
		return user;
		//CONTINUE
	}
	

}
