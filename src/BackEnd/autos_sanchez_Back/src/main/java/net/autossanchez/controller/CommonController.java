package net.autossanchez.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.PhotoVehicle;
import net.autossanchez.entity.Provinces;
import net.autossanchez.service.MunicipalityService;
import net.autossanchez.service.PhotoVehicleService;
import net.autossanchez.service.ProvincesService;

@RestController
@RequestMapping("/common")
@CrossOrigin(origins = "*")
public class CommonController {

	@Autowired
	PhotoVehicleService photoVehicleService;

	@Autowired
	ProvincesService provincesService;

	@Autowired
	MunicipalityService municipalityService;

	/* Obtenemos todos las FOTOS de los VEHICULOS */

	@GetMapping("/getPhotoList")
	public ResponseEntity<PhotoVehicle> getPhotoVehicleList() {
		List<PhotoVehicle> rest = photoVehicleService.getALL();

		return new ResponseEntity(rest, HttpStatus.OK);
	}

	/* Obtenemos todos las FOTOS de los VEHICULOS por ID */
	@GetMapping("/photo/{id}")
	public ResponseEntity<Object> getPhotoVehicleById(@PathVariable int id) {
		try {
			PhotoVehicle rest = photoVehicleService.getById(id).orElse(null);

			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos las PROVINCIAS */
	@GetMapping("/getProvinceList")
	public ResponseEntity<Provinces> getProvincesList() {
		List<Provinces> rest = provincesService.getALL();

		return new ResponseEntity(rest, HttpStatus.OK);
	}

	/* Obtenemos todos las PROVINCIAS por ID */
	@GetMapping("/province/{id}")
	public ResponseEntity<Object> getProvincesById(@PathVariable int id) {
		try {
			Provinces rest = provincesService.getById(id).orElse(null);

			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos las MUNICIPIOS */
	@GetMapping("/getMunicipalityList")
	public ResponseEntity<Municipality> getMunicipalityList() {
		List<Municipality> rest = municipalityService.getALL();

		return new ResponseEntity(rest, HttpStatus.OK);
	}

	/* Obtenemos todos las MUNICIPIOS por ID */
	@GetMapping("/getMunicipality/{id}")
	public ResponseEntity<Object> getMunicipalityById(@PathVariable int id) {
		try {
			Municipality rest = municipalityService.getById(id).orElse(null);

			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos las MUNICIPIOS por ID de PROVINCIA */
	@GetMapping("/getMunicipalityProvince/{id}")
	public ResponseEntity<Object> getMunicipalityByProvinceId(@PathVariable int id) {
		try {

			Provinces province = provincesService.getById(id).orElse(null);
			List<Municipality> rest = municipalityService.getByProvinceId(province);

			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}
}
