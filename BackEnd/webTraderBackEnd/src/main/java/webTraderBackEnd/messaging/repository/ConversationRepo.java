package webTraderBackEnd.messaging.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.messaging.domain.Conversation;

@Repository
public interface ConversationRepo extends CrudRepository<Conversation,Long>{
	Optional<Conversation> findById(Long id);
}
