package net.autossanchez.entity;

import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vehicle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String vin;

	private String numberPlate;
	
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
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "photo_id")
	private PhotoVehicle photoId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User userId;
}