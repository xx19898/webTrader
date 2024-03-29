package webTraderBackEnd.user.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import webTraderBackEnd.user.domain.User;

@Repository
public class UserInsertRepository {
	
	@PersistenceContext 
	private EntityManager entityManager;
	
	@Transactional 
	public void insertWithQuery(User user){
		entityManager.createNativeQuery("INSERT INTO user (username, password) VALUES(?,?)")
		      .setParameter(1,user.getUsername())
		      .setParameter(2,user.getPassword())
		      .executeUpdate();
	}
	

}
