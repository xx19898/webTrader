package webTraderBackEnd.user.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;


@Data
@Entity
public class Role {
	@Id
	private Long id;
	private String name;
	public String getName() {
		return this.name;
	}
	
	

}
