package net.autossanchez.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.Vehicle;


public interface PhotoVehicleRepository extends JpaRepository<PhotoVehicle, Long> {

	List<PhotoVehicle> getListByVehicle(Vehicle vehicle);
	List<PhotoVehicle> getListByVehicleId(long vehicleId);
	PhotoVehicle deleteById(long photoVehicleId);
	


}
