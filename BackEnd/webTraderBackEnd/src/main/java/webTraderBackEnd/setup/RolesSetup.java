package webTraderBackEnd.setup;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import webTraderBackEnd.user.domain.Role;
import webTraderBackEnd.user.repository.RoleRepo;
import webTraderBackEnd.user.repository.UserRepo;

@Component
public class RolesSetup implements ApplicationListener<ContextRefreshedEvent>{
	
	boolean alreadySetup = false;
	
	@Autowired
	private RoleRepo roleRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event){
		if(alreadySetup)
			return;
		
		createRoleIfNotFound("ROLE_ADMIN");
		createRoleIfNotFound("ROLE_USER");
		
		alreadySetup = true;
		
		
		
		
	}
	
	@Transactional
	Role createRoleIfNotFound(String name){
		Role role;
		Optional<Role> optionalRole = roleRepo.findByName(name);
		if(optionalRole.isEmpty()) {
			role = new Role(name);
			roleRepo.save(role);
		}
		else{
			role = optionalRole.get();
		}
		return role;
	}
	
	
}
