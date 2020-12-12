package net.autossanchez.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
	List<Vehicle> findByNumberPlate(String numberPlate);

	List<Vehicle> findByVin(String vin);

	List<Vehicle> findByBrand(String brand);

	List<Vehicle> findByModel(String Model);

	List<Vehicle> findByCodeStatus(boolean codeStatus);

	List<Vehicle> findByUserId(User userOK);

	boolean existsByUserId(User user);

	boolean existsByNumberPlate(String numberPlate);

	boolean existsByVin(String vin);

}
