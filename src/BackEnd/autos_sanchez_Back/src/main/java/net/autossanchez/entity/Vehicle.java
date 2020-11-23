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
	@NotNull
	private String vin;
	@NotNull
	private String numberPlate;
	@NotNull
	private String brand;
	@NotNull
	private String model;
	@NotNull
	private String imagen;
	@NotNull
	private int years;
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
	private boolean cassousel;
	@NotNull
	private boolean codeStatus;
	
	
	 @ManyToOne(fetch = FetchType.EAGER,optional = false)
	 @JoinColumn(name = "user_id",nullable = false)
	private User userId;
}