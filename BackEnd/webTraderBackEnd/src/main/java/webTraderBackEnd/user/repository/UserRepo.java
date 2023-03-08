package webTraderBackEnd.user.repository;


import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.dto.AdminDTO;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;


@Repository
public interface UserRepo extends CrudRepository<User, Long>{
		
	Optional<User> findByUsername(String username);
    
	@Query(value="SELECT * FROM USER",
			nativeQuery = true,
			countQuery = "SELECT * FROM USER")
	Page<User> findAll(Pageable pageable);
	
	@Query(value="SELECT username,user_id  FROM users_roles ur INNER JOIN user u on ur.user_id = u.id where role_id = 1",
			nativeQuery = true
			)
	Set<AdminUsernameAndId> findUsersWithAdminRole();
}