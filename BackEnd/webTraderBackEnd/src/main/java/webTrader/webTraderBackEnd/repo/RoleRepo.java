package webTrader.webTraderBackEnd.repo;
import webTrader.webTraderBackEnd.domain.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role,Long>{
	Optional<Role> findByName(String name);
}
