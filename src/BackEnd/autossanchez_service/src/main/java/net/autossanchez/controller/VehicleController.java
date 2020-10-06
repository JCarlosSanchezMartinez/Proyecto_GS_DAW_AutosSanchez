package net.autossanchez.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.entity.VehicleRepository;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class VehicleController  {

	private final VehicleRepository vehicleRepository;

	/**
	 * Obtenemos todos los Vehicles
	 * 
	 * @return
	 */
	@GetMapping("/readVehicleALL")
	public ResponseEntity<Object> obtenerTodos() {
		List<Vehicle> rest = vehicleRepository.findAll();

		if (rest.isEmpty()) {

			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(rest);
		}

	}

	/**
	 * Obtenemos un Vehicle en base a su ID
	 * 
	 * @param id
	 * @return Null si no encuentra el Vehicle
	 */
	@GetMapping("/getVehicle/{id}")
	public ResponseEntity<Object> obtenerUno(@PathVariable Long id) {
		try {
			Vehicle rest = vehicleRepository.findById(id).orElse(null);

			if (rest == null) {

				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}

	}
	
	/**
	 * Obtenemos un Vehicle en base a su ID
	 * 
	 * @param number_plate
	 * @return Null si no encuentra el Vehicle
	 */
	@GetMapping("/getVehicleNumberPlate/{number_plate}")
	public ResponseEntity<Object> getVehicleNumberPlate(@PathVariable String number_plate) {
		try {
			
		
			List<Vehicle> data = vehicleRepository.findAll();
			Vehicle rest = null;
			
			for (int i = 0; i < data.size(); i++) {
				if (data.get(i).getNumber_plate().equals(number_plate)) {
					rest = data.get(i);
				}
			}
			

			if (rest == null) {

				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}

	}

	/**
	 * Insertamos un nuevo Vehicle
	 * 
	 * @param nuevo
	 * @return Vehicle insertado
	 */
	@PostMapping("/addVehicle")
	public ResponseEntity<Vehicle> nuevoVehicle(@RequestBody Vehicle nuevo) {
		Vehicle rest = vehicleRepository.save(nuevo);
		return ResponseEntity.status(HttpStatus.CREATED).body(rest);
	}

	/**
	 * 
	 * @param editar
	 * @param id
	 * @return
	 */
	@PutMapping("/updateVehicle/{id}")
	public ResponseEntity<?> editarVehicle(@RequestBody Vehicle editar, @PathVariable Long id) {

		return vehicleRepository.findById(id).map(p -> {

			p.setNumber_plate(editar.getNumber_plate());
			p.setBrand(editar.getBrand());
			p.setModel(editar.getModel());
			p.setEngine(editar.getEngine());
			p.setVin(editar.getVin());
			p.setPrice(editar.getPrice());
			p.setUser_id(editar.getUser_id());

			return ResponseEntity.ok(vehicleRepository.save(p));
		}).orElseGet(() -> {
			return ResponseEntity.notFound().build();
		});

	}

	/**
	 * Borra un Vehicle del catálogo en base a su id
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/deleteVehicle/{id}")
	public ResponseEntity<?> borrarVehicle(@PathVariable Long id) {

		vehicleRepository.deleteById(id);
		return ResponseEntity.noContent().build();

	}
}