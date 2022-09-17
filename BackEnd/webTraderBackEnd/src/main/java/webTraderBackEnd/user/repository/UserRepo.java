package webTraderBackEnd.user.repository;


import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.user.domain.User;


@Repository
public interface UserRepo extends CrudRepository<User, Long> {
	
	
	
	Optional<User> findByUsername(String username);
    
	@Query(value="SELECT * FROM USER",
			nativeQuery = true,
			countQuery = "SELECT * FROM USER")
	Page<User> findAll(Pageable pageable);
}