package net.autossanchez.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(columnDefinition = "varchar(9)")
	private String dni;

	@Column(nullable = false)
	private String firstName;

	private String lastName;

	private String label;

	private String address;

	private long phone;

	@Column(nullable = false)
	private String email;

	@Column(unique = true, nullable = false, columnDefinition = "varchar(20)")
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private boolean codeStatus;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "municipality_id", nullable = false)
	private Municipality municipality;

	@NotNull
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_rol", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
	private Set<Rol> roles = new HashSet<>();

	public User(@NotNull String firstName, @NotNull String username, @NotNull String email, @NotNull String password,
			@NotNull Municipality municipality) {
		this.firstName = firstName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.municipality = municipality;
	}

	public String addLabel(User user) {
		label = user.getDni() + " - " + user.getFirstName() + " " + user.getLastName();
		return label;

	}

};
