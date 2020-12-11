package net.autossanchez.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.autossanchez.dto.Message;
import net.autossanchez.dto.PhotoVehicleDto;
import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.service.PhotoVehicleService;
import net.autossanchez.service.VehicleService;

@RestController

@RequestMapping("/photoVehicle")
@CrossOrigin(origins = "*")
public class PhotoVehicleController {
	
	@Autowired
	PhotoVehicleService photoVehicleService;
	
	@Autowired
	VehicleService vehicleService;
	
	/* Obtenemos todas las IMAGENES de un PHOTOVEHICLE */

	@GetMapping("/getVehicleImagenList/{id}")
	public ResponseEntity<PhotoVehicleDto> getVehicleImagenList(@PathVariable Long id) {
		try {

			Vehicle vehicle = vehicleService.getByID(id).orElse(null);
			;
			List<PhotoVehicle> photoListTemp = photoVehicleService.getListByVehicle(vehicle);

			List<PhotoVehicleDto> photoList = new ArrayList<>();
			for (PhotoVehicle photoVehicle : photoListTemp) {
				PhotoVehicleDto dto = new PhotoVehicleDto();
				dto.setImagen(photoVehicle.getImagen());
				photoList.add(dto);
			}

			return new ResponseEntity(photoList, HttpStatus.OK);
		} catch (Exception e) {
			return (ResponseEntity<PhotoVehicleDto>) ResponseEntity.notFound();
		}
	}
	
	/* Creamos PHOTOVEHICLE */

	@PostMapping("/addPhotoVehicle")
	public ResponseEntity<?> create(@RequestBody List<PhotoVehicleDto> photoVehicleList) {		
		
		try {
			PhotoVehicleDto restDto = new PhotoVehicleDto();
			PhotoVehicle rest = new PhotoVehicle();
			for (PhotoVehicleDto photoVehicleDto : photoVehicleList) {
				PhotoVehicle photoVehicle = new PhotoVehicle();				
				Vehicle vehicle = vehicleService.getByID(photoVehicleDto.getVehicleId()).orElse(null);
				
				photoVehicle.setImagen(photoVehicleDto.getImagen());
				photoVehicle.setVehicle(vehicle);
				vehicle.setPhotoHead(photoVehicleDto.getImagen());
				
				vehicleService.save(vehicle);
				photoVehicleService.save(photoVehicle);	
			}
			
					
			return ResponseEntity.status(HttpStatus.CREATED).body(rest);
		} catch (Exception e) {
			return new ResponseEntity(new Message(e.toString()), HttpStatus.NOT_FOUND);
		}
	}
	/* Eliminamos PHOTOVEHICLE */
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deletePhotoVehicle/{vehicleId}")
	public ResponseEntity<?> delete(@PathVariable long vehicleId) {
		
		try {
			
			Vehicle vehicle = vehicleService.getByID(vehicleId).orElse(null);
			
			List<PhotoVehicle> photoVehicleList = photoVehicleService.getALL();
			
			for (PhotoVehicle photoVehicle : photoVehicleList) {
				if (photoVehicle.getVehicle() == vehicle ) {
					photoVehicleService.deleteById(photoVehicle.getId());
				}			
			}			
			
		} catch (Exception e) {
			return new ResponseEntity(new Message("producto eliminado"), HttpStatus.OK);
		}
			return ResponseEntity.noContent().build();
	}
}
