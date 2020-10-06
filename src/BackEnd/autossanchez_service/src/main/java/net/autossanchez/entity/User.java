package net.autossanchez.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
public class User {

	@Id @GeneratedValue	
	private Long id;
	
	private String dni;	
	private String first_name;	
	private String last_name;
	private String address;
	private String email;
	private int phone;
	private String username;
	private String password;
	
}
