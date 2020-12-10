package net.autossanchez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.repository.PhotoVehicleRepository;

@Service
@Transactional
public class PhotoVehicleService {

	
	@Autowired
	PhotoVehicleRepository photoVehicleRepository;
	
	public List<PhotoVehicle> getALL() {
		return photoVehicleRepository.findAll();
	}

	public Optional<PhotoVehicle> getById(long id) {
		return photoVehicleRepository.findById( id);
	}
	public List<PhotoVehicle> getListByVehicle(Vehicle vehicle) {
		return photoVehicleRepository.getListByVehicle(vehicle);
	}
	public List<PhotoVehicle> getListByVehicleId(long vehicleId) {
		return photoVehicleRepository.getListByVehicleId(vehicleId);
	}

	public PhotoVehicle save(PhotoVehicle photoVehicle) {
		return photoVehicleRepository.save(photoVehicle);
	}
	public PhotoVehicle deleteById(long id) {
		return photoVehicleRepository.deleteById(id);
	}

}
