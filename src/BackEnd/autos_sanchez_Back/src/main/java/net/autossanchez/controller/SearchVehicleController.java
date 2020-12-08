package net.autossanchez.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.autossanchez.dto.SearchVehicleDto;
import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.service.PhotoVehicleService;
import net.autossanchez.service.UserService;
import net.autossanchez.service.VehicleService;

@RestController

@RequestMapping("/search")
@CrossOrigin(origins = "*")
public class SearchVehicleController {
	

	@Autowired
	VehicleService vehicleService;

	@Autowired
	PhotoVehicleService photoVehicleService;
	

	/* Obtenemos todos los VEHICULOS */
	@GetMapping("/getVehicleListDto")
	public ResponseEntity<SearchVehicleDto> getVehicleListDto() {
		try {
			List<Vehicle> rest = vehicleService.getALL();
			List<SearchVehicleDto> restDto = new ArrayList<>();
			
			for (Vehicle vehicle : rest) {
				SearchVehicleDto dto = new SearchVehicleDto();
				dto.setId(vehicle.getId());
				dto.setBrand(vehicle.getBrand());
				dto.setModel(vehicle.getModel());
				dto.setSellDate(vehicle.getSellDate());
				dto.setEngine(vehicle.getEngine());
				dto.setPrice(vehicle.getPrice());
				dto.setFuel(vehicle.getFuel());
				dto.setKms(vehicle.getKms());
				dto.setChasis(vehicle.getChasis());
				dto.setColor(vehicle.getColor());
				dto.setExtra(vehicle.getExtra());
				dto.setCarrousel(vehicle.isCarrousel());
				dto.setCodeStatus(vehicle.isCodeStatus());
				dto.setPhotoId(vehicle.getPhotoId());
				
				restDto.add(dto);	
			}
			

			return new ResponseEntity(restDto, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<SearchVehicleDto>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los VEHICULOS CARROUSEL */
	@GetMapping("/carrouselDto")
	public ResponseEntity<SearchVehicleDto> getVehicleCarrouselDto() {
		try {
			List<Vehicle> list = vehicleService.getALL();
			List<Vehicle> rest = new ArrayList<>();
			List<SearchVehicleDto> restDto = new ArrayList<>();

			for (Vehicle vehicle : list) {
				if (vehicle.isCarrousel() == true) {
					rest.add(vehicle);
				}
			}
			
			for (Vehicle vehicle : rest) {
				SearchVehicleDto dto = new SearchVehicleDto();
				dto.setId(vehicle.getId());
				dto.setBrand(vehicle.getBrand());
				dto.setModel(vehicle.getModel());
				dto.setSellDate(vehicle.getSellDate());
				dto.setEngine(vehicle.getEngine());
				dto.setPrice(vehicle.getPrice());
				dto.setFuel(vehicle.getFuel());
				dto.setKms(vehicle.getKms());
				dto.setChasis(vehicle.getChasis());
				dto.setColor(vehicle.getColor());
				dto.setExtra(vehicle.getExtra());
				dto.setCarrousel(vehicle.isCarrousel());
				dto.setCodeStatus(vehicle.isCodeStatus());
				dto.setPhotoId(vehicle.getPhotoId());
				
				restDto.add(dto);	
			}
			
			return new ResponseEntity(restDto, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<SearchVehicleDto>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los VEHICULOS por ID */
	@GetMapping("/{id}")
	public ResponseEntity<Object> getByIdDto(@PathVariable Long id) {
		try {
			Vehicle vehicle = vehicleService.getByID(id).orElse(null);
			
				SearchVehicleDto dto = new SearchVehicleDto();
				dto.setId(vehicle.getId());
				dto.setBrand(vehicle.getBrand());
				dto.setModel(vehicle.getModel());
				dto.setSellDate(vehicle.getSellDate());
				dto.setEngine(vehicle.getEngine());
				dto.setPrice(vehicle.getPrice());
				dto.setFuel(vehicle.getFuel());
				dto.setKms(vehicle.getKms());
				dto.setChasis(vehicle.getChasis());
				dto.setColor(vehicle.getColor());
				dto.setExtra(vehicle.getExtra());
				dto.setCarrousel(vehicle.isCarrousel());
				dto.setCodeStatus(vehicle.isCodeStatus());
				dto.setPhotoId(vehicle.getPhotoId());
			

			if (dto == null) {

				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(dto);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}

	}
	
	/* Obtenemos todas las IMAGENES de un VEHICULO */
	@GetMapping("/getVehicleImagenList")
	public ResponseEntity<Vehicle> getVehicleImagenList(@PathVariable Long id) {
		try {
			Optional<Vehicle> vehicle = vehicleService.getByID(id);
			
			//List<PhotoVehicle> rest = vehicleService.getPhotoVehicle(vehicle.g);

			return new ResponseEntity(vehicle, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<Vehicle>) ResponseEntity.notFound();
		}
	}

}
