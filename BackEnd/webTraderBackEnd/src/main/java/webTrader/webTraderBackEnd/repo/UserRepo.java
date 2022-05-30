package webTrader.webTraderBackEnd.repo;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTrader.webTraderBackEnd.domain.User;


@Repository
public interface UserRepo extends CrudRepository<User, Long> {
	
	
	
	Optional<User> findByUsername(String username);
    
	@Query(value="SELECT * FROM USER",
			nativeQuery = true,
			countQuery = "SELECT * FROM USER")
	Page<User> findAll(Pageable pageable);
}