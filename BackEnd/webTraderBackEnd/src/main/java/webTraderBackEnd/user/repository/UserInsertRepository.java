package webTraderBackEnd.user.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import webTraderBackEnd.user.domain.User;

public class UserInsertRepository {
	
	@PersistenceContext 
	private EntityManager entityManager;
	
	@Transactional 
	public void insertWithQuery(User user) {
		entityManager.createNativeQuery("INSERT INTO user (username, password) VALUES(?,?)")
		      .setParameter(1,user.getUsername())
		      .setParameter(2,user.getPassword());
		
	}
	

}
