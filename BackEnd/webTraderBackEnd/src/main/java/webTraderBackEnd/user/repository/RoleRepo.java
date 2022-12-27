package webTraderBackEnd.user.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.user.domain.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role,Long>{
	Optional<Role> findByName(String name);
}
