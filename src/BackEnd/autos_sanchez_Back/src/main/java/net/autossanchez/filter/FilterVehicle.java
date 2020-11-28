package net.autossanchez.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterVehicle {
	private String vin;	
	private String numberPlate;
	private String brand;
	private String model;
	private boolean codeStatus;

}
