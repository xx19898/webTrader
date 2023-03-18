package webTraderBackEnd.messaging.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.dtos.ConversationDTO;

@Repository
public interface ConversationRepo extends CrudRepository<Conversation,Long>{
	Optional<Conversation> findById(Long id);
}
