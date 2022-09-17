package webTraderBackEnd.user.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import webTraderBackEnd.user.domain.Role;

public interface RoleRepo extends JpaRepository<Role,Long>{
	Optional<Role> findByName(String name);
}
