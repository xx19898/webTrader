package repositories;

import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import webTraderBackEnd.WebTraderBackEndApplication;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.messaging.repository.ConversationRepo;
import webTraderBackEnd.user.domain.User;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ContextConfiguration(classes =  webTraderBackEnd.WebTraderBackEndApplication.class)
@DataJpaTest
public class ConversationRepoTest{
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private ConversationRepo convRepo;
	
	@Test
	void testExample() throws Exception{
		this.entityManager.merge(new User("user1",Long.parseLong("109")));
	}
	
	@Test
	void testConvo(){
		Optional<Conversation> convo = convRepo.findById(Long.parseLong("4"));
		assertTrue(convo.isEmpty());
	}
	
	
}
