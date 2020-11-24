package net.autossanchez.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.autossanchez.dto.Message;
import net.autossanchez.dto.VehicleDto;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.repository.VehicleRepository;
import net.autossanchez.service.UserService;
import net.autossanchez.service.VehicleService;

@RestController

@RequestMapping("/vehicle")
@CrossOrigin(origins = "*")
public class VehicleController {

	@Autowired
	VehicleService vehicleService;

	@Autowired
	UserService userService;

	/* Obtenemos todos los VEHICULOS */
	@GetMapping("/getVehicleList")
	public ResponseEntity<Vehicle> getVehicleList() {
		try {
			List<Vehicle> rest = vehicleService.getALL();

			return new ResponseEntity(rest, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<Vehicle>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los VEHICULOS CARROUSEL */
	@GetMapping("/carrousel")
	public ResponseEntity<Vehicle> getVehicleCarrousel() {
		try {
			List<Vehicle> list = vehicleService.getALL();
			List<Vehicle> rest = null;

			for (Vehicle vehicle : list) {
				if (vehicle.isCarrousel() == true) {
					rest.add(vehicle);
				}
			}
			return new ResponseEntity(rest, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<Vehicle>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los VEHICULOS por ID */
	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		try {
			Vehicle rest = vehicleService.getByID(id).orElse(null);

			if (rest == null) {

				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}

	}

	/* Obtenemos todos los VEHICULOS por NUMBER PLATE */
	@GetMapping("/details/{numberPlate}")
	public ResponseEntity<Vehicle> getByNumberPlate(@PathVariable("numberPlate") String numberPlate) {
		try {
			if (!vehicleService.existByNumberPlate(numberPlate))
				return new ResponseEntity(new Message("No existe"), HttpStatus.NOT_FOUND);

			List<Vehicle> vehicle = vehicleService.getByNumberPlate(numberPlate);
			return new ResponseEntity(vehicle, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<Vehicle>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los VEHICULOS del USUARIO por USER_ID */
	@GetMapping("/vehicle/{userId}")
	public ResponseEntity<Vehicle> getVehicleByUserId(@PathVariable("userId") int userId) {
		try {
			User userOK = userService.getById(userId).orElse(null);

			if (userOK != null) {
				List<Vehicle> vehicleList = vehicleService.getVehiclesByUserId(userOK);
				return new ResponseEntity(vehicleList, HttpStatus.OK);
			}
			return new ResponseEntity(new Message("No existe"), HttpStatus.NOT_FOUND);

		} catch (Exception e) {
			return new ResponseEntity(new Message("No existe"), HttpStatus.NOT_FOUND);

		}
	}

	/* Creamos VEHICULO */
	
	@PostMapping("/addVehicle")
	public ResponseEntity<?> create(@RequestBody Vehicle vehicle) {

		try {
			Vehicle rest = vehicleService.save(vehicle);
			return ResponseEntity.status(HttpStatus.CREATED).body(rest);
		} catch (Exception e) {
			return new ResponseEntity(new Message(e.toString()), HttpStatus.NOT_FOUND);
		}
	}

	/* Actualizamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/updateVehicle/{id}")
	public ResponseEntity<Vehicle> update(@PathVariable("id") int id, @RequestBody Vehicle vehicle) {

		try {
			Vehicle rest = vehicleService.getByID(id).get();

			
			rest.setVin(vehicle.getVin());
			rest.setNumberPlate(vehicle.getNumberPlate());
			rest.setBrand(vehicle.getBrand());
			rest.setModel(vehicle.getModel());
			rest.setEngine(vehicle.getEngine());
			rest.setPrice(vehicle.getPrice());
			rest.setFuel(vehicle.getFuel());
			rest.setColor(vehicle.getColor());
			rest.setKms(vehicle.getKms());
			rest.setChasis(vehicle.getChasis());
			rest.setExtra(vehicle.getExtra());
			rest.setCarrousel(vehicle.isCarrousel());
			rest.setCodeStatus(vehicle.isCodeStatus());
			rest.setUserId(vehicle.getUserId());

			return ResponseEntity.ok(vehicleService.save(rest));
		} catch (Exception e) {
			return new ResponseEntity(new Message(e.toString()), HttpStatus.NOT_FOUND);
		}

	}

	/* Eliminamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/deleteVehicle/{id}")
	public ResponseEntity<?> delete(@PathVariable long id) {
		
		try {
			Vehicle vehicle = vehicleService.getByID(id).orElse(null);
			vehicle.setCodeStatus(false);
			vehicleService.save(vehicle);
			
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		
		return ResponseEntity.noContent().build();

	}
	
	/* Reactivamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/reactivateVehicle/{id}")
	public ResponseEntity<?> reactivate(@PathVariable long id) {
		
		try {
			Vehicle vehicle = vehicleService.getByID(id).orElse(null);
			vehicle.setCodeStatus(true);
			vehicleService.save(vehicle);
			
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		
		return ResponseEntity.noContent().build();

	}

}
