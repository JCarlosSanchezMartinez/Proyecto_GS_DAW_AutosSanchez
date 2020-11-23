package net.autossanchez.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity 
@Data @NoArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotNull
	@Column(unique = true)
	private String dni;	
	
	@NotNull
	private String firstName;
	
	@NotNull
	private String lastName;
	
	@NotNull
	private String address;
	
	@NotNull
	private String city;
	
	@NotNull	
	private int phone;
	
	@NotNull
	private String email;
	
	@NotNull
	@Column(unique = true)
	private String username;
	
	@NotNull
	private String password;
	
	@NotNull
	private boolean codeStatus;

	
	@NotNull
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_rol", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
	private Set<Rol> roles = new HashSet<>();
	
	 public User(@NotNull String firstName, @NotNull String username, @NotNull String email, @NotNull String password) {
	        this.firstName = firstName;
	        this.username = username;
	        this.email = email;
	        this.password = password;
	    }

}
