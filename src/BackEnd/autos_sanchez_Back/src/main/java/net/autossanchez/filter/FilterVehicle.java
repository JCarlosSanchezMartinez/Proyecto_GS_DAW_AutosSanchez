package net.autossanchez.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.autossanchez.entity.User;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterVehicle {
	private String vin;	
	private String numberPlate;
	private String brand;
	private String model;
	private User user;
	private boolean codeStatus;

}
