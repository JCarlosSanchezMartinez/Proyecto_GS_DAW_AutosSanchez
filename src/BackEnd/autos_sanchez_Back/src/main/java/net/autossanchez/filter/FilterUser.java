package net.autossanchez.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterUser {
	private String dni;
	private String firstName;
	private String lastName;
	private String numberPlate;
	private String municipality;
	private boolean codeStatus;
}
