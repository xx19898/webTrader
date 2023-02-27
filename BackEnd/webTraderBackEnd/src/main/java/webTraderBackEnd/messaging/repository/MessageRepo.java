package webTraderBackEnd.messaging.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.messaging.domain.Message;

@Repository
public interface MessageRepo extends CrudRepository<Message, Long>{
	Optional<Message> findById(Long id);
}
