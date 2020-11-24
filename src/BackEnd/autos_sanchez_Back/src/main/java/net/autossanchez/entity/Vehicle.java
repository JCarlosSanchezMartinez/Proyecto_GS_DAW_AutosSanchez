package net.autossanchez.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vehicle {

	@Id
	@GeneratedValue
	private Long id;
	
	private String vin;

	private String numberPlate;
	
	private String brand;
	
	private String model;
	
	private String imagen;
	
	private int years;
	
	private String engine;
	
	private int price;
	
	private String fuel;
	
	private String color;
	
	private int kms;
	
	private String chasis;
	
	private String extra;
	@NotNull
	private boolean carrousel;
	@NotNull
	private boolean codeStatus;
	
	
	 @ManyToOne(fetch = FetchType.EAGER,optional = false)
	 @JoinColumn(name = "user_id",nullable = false)
	private User userId;
}