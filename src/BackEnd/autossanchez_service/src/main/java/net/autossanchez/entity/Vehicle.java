package net.autossanchez.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	private String number_plate;
	private String brand;
	private String model;
	private String engine;
	private int price;
	
	 @ManyToOne(fetch = FetchType.EAGER,optional = false)
	 @JoinColumn(name = "user_id",nullable = false)
	private User user_id;
}
