package net.autossanchez.email.rest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDetails {

	private String firstName;

	private String lastName;

	private String email;

	private String phone;
	
	private String mensaje;

}
