package net.autossanchez.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUser {

	@NotBlank
	private String username;
	@NotBlank
	private String password;
	private Set<String> roles = new HashSet<>();

}
