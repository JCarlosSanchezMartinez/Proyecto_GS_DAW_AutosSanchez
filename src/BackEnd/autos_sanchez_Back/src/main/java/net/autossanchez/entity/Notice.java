package net.autossanchez.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
public class Notice {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String comment;
	
	@ManyToOne(fetch = FetchType.EAGER,optional = false)
	@JoinColumn(name = "vehicle_id",nullable = false)
	private Vehicle vehicleId;
	
	@ManyToOne(fetch = FetchType.EAGER,optional = false)
	@JoinColumn(name = "user_id",nullable = false)
	private User userId;
	


}
