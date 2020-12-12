package net.autossanchez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.repository.VehicleRepository;

@Service
@Transactional
public class VehicleService {

	@Autowired
	VehicleRepository vehicleRepository;

	public List<Vehicle> getALL() {
		return vehicleRepository.findAll();
	}

	public Optional<Vehicle> getByID(long id) {
		return vehicleRepository.findById(id);
	}

	public List<Vehicle> getVehiclesByUserId(User userOK) {
		return vehicleRepository.findByUserId(userOK);
	}

	public Vehicle save(Vehicle vehicle) {
		return vehicleRepository.save(vehicle);
	}

	public void delete(long id) {
		vehicleRepository.deleteById(id);
	}

	public boolean existByID(long id) {
		return vehicleRepository.existsById(id);
	}

	public boolean existByNumberPlate(String numberPlate) {
		return vehicleRepository.existsByNumberPlate(numberPlate);
	}

	public boolean existByVin(String vin) {
		return vehicleRepository.existsByVin(vin);
	}

	public boolean existByUser_Id(User user) {
		return vehicleRepository.existsByUserId(user);
	}

	// FILTRO
	public List<Vehicle> getByNumberPlate(String numberPlate) {
		return vehicleRepository.findByNumberPlate(numberPlate);
	}

	public List<Vehicle> getByVin(String vin) {
		return vehicleRepository.findByVin(vin);
	}

	public List<Vehicle> getByBrand(String brand) {
		return vehicleRepository.findByBrand(brand);
	}

	public List<Vehicle> getByModel(String model) {
		return vehicleRepository.findByModel(model);
	}

	public List<Vehicle> getByCodeStatus(boolean codeStatus) {
		return vehicleRepository.findByCodeStatus(codeStatus);
	}

}
