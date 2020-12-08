package net.autossanchez.dto;

import java.util.Date;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchVehicleDto {
	
	private Long id;
	
	private String brand;
	
	private String model;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date sellDate;
	
	private String engine;
	
	private long price;
	
	private String fuel;
	
	private String color;
	
	private long kms;
	
	private String chasis;
	
	private String extra;

	private boolean carrousel;

	private boolean codeStatus;

	private PhotoVehicle photoId;
}
