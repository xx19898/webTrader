package repositories;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import webTraderBackEnd.WebTraderBackEndApplication;
import webTraderBackEnd.user.domain.User;
import webTraderBackEnd.user.repository.UserRepo;
import webTraderBackEnd.user.repository.projections.AdminUsernameAndId;


@ContextConfiguration(classes=WebTraderBackEndApplication.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
public class UserRepotTest{
	
	@Autowired
	private UserRepo userRepo;
	
	@Test
	public void admin_username_and_id_projection_works() {
		Set<AdminUsernameAndId> users = userRepo.findUsersWithAdminRole();
		System.out.println(users.size());
		assertTrue(users.iterator().next().getUsername().equals("admin"));
	}
	
}
