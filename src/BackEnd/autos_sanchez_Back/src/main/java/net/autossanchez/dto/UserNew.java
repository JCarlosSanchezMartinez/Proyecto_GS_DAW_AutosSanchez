package net.autossanchez.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.autossanchez.entity.Municipality;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserNew {

	@NotBlank
	private String firstName;
	@NotBlank
	private String username;
	@NotBlank
	private String email;
	@NotBlank
	private String password;
	private Set<String> roles = new HashSet<>();

	private Municipality municipality;
}
