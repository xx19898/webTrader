package webTraderBackEnd.user.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginCredentials{
	private String username;
	private String password;

}
