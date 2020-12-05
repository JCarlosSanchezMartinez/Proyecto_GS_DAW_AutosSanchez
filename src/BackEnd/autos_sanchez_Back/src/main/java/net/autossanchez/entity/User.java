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
	
	
	@Column(columnDefinition = "varchar(9)")
	private String dni;	
	
	@Column(nullable = false)
	private String firstName;
	

	private String lastName;
	

	private String address;
	
	
	private long phone;
	
	@Column(nullable = false)
	private String email;
	

	@Column(unique = true,nullable = false, columnDefinition = "varchar(20)")
	private String username;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private boolean codeStatus;
	
	@ManyToOne(fetch = FetchType.EAGER,optional = false)
	@JoinColumn(name = "municipality_id",nullable = false)
	private Municipality municipality;

	
	@NotNull
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_rol", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
	private Set<Rol> roles = new HashSet<>();
	
	 public User(@NotNull String firstName, @NotNull String username, @NotNull String email, @NotNull String password ,@NotNull Municipality municipality) {
	        this.firstName = firstName;
	        this.username = username;
	        this.email = email;
	        this.password = password;
	        this.municipality = municipality;
	    }

}
