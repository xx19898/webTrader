package webTraderBackEnd.messaging.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import webTraderBackEnd.messaging.domain.Conversation;

@Repository
public class ConversationInsertRepo {
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Transactional
	public void insertWithQuery(Conversation conversation){
		entityManager.createNativeQuery("INSERT INTO conversation (firstPart,secondPart) VALUES (?,?)")
		.setParameter(1, conversation.getFirstPart())
		.setParameter(2, conversation.getSecondPart())
		.executeUpdate();
	}

}
