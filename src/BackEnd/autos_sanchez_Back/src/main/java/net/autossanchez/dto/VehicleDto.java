package net.autossanchez.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDto {
	
	@Id
	@GeneratedValue
	private Long id;
	@NotNull
	@NotBlank
	private String vin;
	@NotNull
	private String numberPlate;
	@NotNull
	private String brand;
	@NotNull
	private String model;
	@NotNull
	private String engine;
	@NotNull
	private int price;
	@NotNull
	private String fuel;
	@NotNull
	private String color;
	@NotNull
	private int kms;
	@NotNull
	private String chasis;
	@NotNull
	private String extra;
	@NotNull
	private int user_id;
	@NotNull
	private boolean cassousel;
	@NotNull
	private boolean codeStatus;
	


}
