package domain;

import javax.persistence.Entity;
import javax.persistence.Id;



@Entity
public class Role {
	@Id
	private Long id;
	private String name;
	public String getName() {
		return this.name;
	}
	
	

}
