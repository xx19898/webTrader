package domain;
import static java.util.Arrays.stream;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity // This tells Hibernate to make a table out of this class
public class User implements UserDetails{
	

 public User(
		 @JsonProperty("username") String username,
		 @JsonProperty("password") String password
		 ) {
	 this.username = username;
	 this.password = password;
 }
 

 
 public User() {}
  	
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column
  private Long id;

  @Column
  @CreatedDate
  private LocalDateTime createdAt;
  
  @Column
  @LastModifiedDate
  private LocalDateTime modifiedAt;
  
  @Column
  private String username;
  
  @Column
  private String email;
  
  @Column
  private String password;
  
  @ManyToMany(fetch= FetchType.EAGER)
  private List<Role> roles = new ArrayList<>();

  public Long getId() { 
    return id;
  }

  public void setName(String newUsername) {
    this.username = newUsername;
  }
  
  

  public String getEmail() {
    return email;
  }
  

  public void setEmail(String email) {
    this.email = email;
  }
  public void setPassword(String password) {
	  this.password = password;
  }

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	Collection <SimpleGrantedAuthority> authorities = new ArrayList<>();
	roles.forEach(role -> {
		authorities.add(new SimpleGrantedAuthority(role.getName()));
	});
	return authorities;
}

@Override
public String getPassword() {
	return password;
}

public Collection<Role> getRoles(){
	return this.roles;
}

@Override
public String getUsername() {
	return username;
}




@Override
public boolean isAccountNonExpired() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isAccountNonLocked() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isCredentialsNonExpired() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isEnabled() {
	// TODO Auto-generated method stub
	return true;
}
}
