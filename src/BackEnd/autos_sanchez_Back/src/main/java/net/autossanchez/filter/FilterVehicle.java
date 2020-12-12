package net.autossanchez.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterVehicle {
	private Vehicle vehicle;
	private String brand;
	private String model;
	private User user;
	private boolean codeStatus;

}
