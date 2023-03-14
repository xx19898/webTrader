package webTraderBackEnd.user.domain;
import static java.util.Arrays.stream;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.transaction.Transactional;

import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import webTraderBackEnd.messaging.domain.Conversation;
import webTraderBackEnd.portfolioStocks.domain.Portfolio;
import webTraderBackEnd.portfolioStocks.domain.StockDeal;

@Getter
@Entity
@Table
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails{
	

 public User(
		 @JsonProperty("username") String username,
		 @JsonProperty("password") String password
		 ){
	 this.username = username;
	 this.password = password;
 }
 
 public User(String username,Long id) {
	 this.username = username;
	 this.id = id;
 }
 
 public User() {}
   	
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column
  private Long id;

  @Column(name = "created_date")
  @CreatedDate
  private long createdDate;
   
  
  @Column
  @LastModifiedDate
  private LocalDateTime modifiedAt;
  
  @Column
  private String username;
  
  @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  private Set<Conversation> conversations; 
  
  @Column
  private String email;
  
  @JsonIgnore
  @Column
  private String password;
  
  @OneToOne(
		  mappedBy = "user",
		  fetch = FetchType.LAZY,
		  cascade = CascadeType.ALL
		  )
  private Portfolio portfolio;
  
  @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  @JoinTable(
		  name="users_roles",
		  joinColumns = @JoinColumn(
				  name="user_id", referencedColumnName = "id"),
		  inverseJoinColumns = @JoinColumn(
				  name = "role_id", referencedColumnName = "id"))
  private Collection<Role> roles;
  
  @OneToMany(targetEntity = StockDeal.class, mappedBy="user",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
  private Set<StockDeal> stockDeals;
  
  public void addStockDeal(StockDeal stockDeal){
	this.stockDeals.add(stockDeal);  
  }
  
  public void addConversation(Conversation conversation) {
  	  this.conversations.add(conversation);
  }
  
  public Long getId() { 
    return id;
  }

  public void setName(String newUsername) {
    this.username = newUsername;
  }
  
  public String getEmail() {
    return email;
  }

  public void setEmail(String email){
    this.email = email;
  }
  
  public void setPassword(String password){
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
public String getPassword(){
	return password;
}

public Collection<Role> getRoles(){
	return this.roles;
}

@Transactional
public void setRoles(List<Role> newRoles){
	this.roles = newRoles;
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
public boolean isAccountNonLocked(){
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
