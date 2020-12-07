package net.autossanchez.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.autossanchez.dto.Message;
import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.filter.FilterUser;
import net.autossanchez.service.MunicipalityService;
import net.autossanchez.service.UserService;
import net.autossanchez.service.VehicleService;

@RestController

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	VehicleService vehicleService;

	@Autowired
	MunicipalityService municipalityService;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	/* Obtenemos todos los USUARIOS */
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getUserList")
	public ResponseEntity<User> getUserList() {
		List<User> rest = userService.getALL();

		return new ResponseEntity(rest, HttpStatus.OK);
	}

	/* Obtenemos todos los USUARIOS por ID */
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<Object> getById(@PathVariable int id) {
		try {
			User rest = userService.getById(id).orElse(null);

			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}

	/* Obtenemos todos los USUARIOS por DNI */
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/details/{dni}")
	public ResponseEntity<Object> getById(@PathVariable String dni) {
		try {

			List<User> rest = userService.getByDni(dni);
			if (rest == null) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rest);
			}
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
	}

	/* Actualizamos USUARIO */
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody User user) {

		if (userService.existsByUsername(user.getUsername())) {
			User rest = userService.getById(id).get();

			rest.setDni(user.getDni());
			rest.setFirstName(user.getFirstName());
			rest.setLastName(user.getLastName());
			rest.setLabel(user.addLabel(user));
			rest.setAddress(user.getAddress());
			rest.setMunicipality(user.getMunicipality());
			rest.setPhone(user.getPhone());
			rest.setEmail(user.getEmail());
			rest.setUsername(user.getUsername());
			rest.setCodeStatus(user.isCodeStatus());
			userService.save(rest);
			return ResponseEntity.ok(rest);
		}
		return (ResponseEntity<Object>) ResponseEntity.notFound();
	}

	/* Eliminamos USUARIO */
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {

		try {
			User user = userService.getById(id).orElse(null);
			user.setCodeStatus(false);
			userService.save(user);

		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		return new ResponseEntity( HttpStatus.OK);
	}

	/* Reactivamos USUARIO */
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/reactivateUser/{id}")
	public ResponseEntity<?> reactivate(@PathVariable int id) {

		try {
			User user = userService.getById(id).orElse(null);
			user.setCodeStatus(true);
			userService.save(user);

		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		return new ResponseEntity( HttpStatus.OK);
	}

	/* Buscamos USUARIOS por FILTER */
	@PreAuthorize("hasRole('ADMIN')")
	@SuppressWarnings("null")
	@PostMapping("/search")
	public ResponseEntity<?> searchUser(@RequestBody FilterUser filter) {

		try {
			List<User> rest = userService.getALL();
			
			if (filter.isCodeStatus()) {
				rest = userService.getByCodeStatus(filter.isCodeStatus());
			}
			if (filter.getDni() != null) {
				rest.clear();;
				rest.add(filter.getDni());
			}
			if (filter.getNumberPlate() != null) {
				List<Vehicle> vehicleList = vehicleService.getByNumberPlate(filter.getNumberPlate());
				Vehicle vehicle = vehicleList.get(0);
				Optional<User> user = userService.getById(vehicle.getUserId().getId());
				rest.contains(user);
			}

			if (filter.getMunicipality() != null) {								
				rest = userService.getByMunicipality(filter.getMunicipality());
			}
			if (filter.getProvince() != null) {
				List<User> userList = new ArrayList<>(); 
				for (int i = 0; i < rest.size(); i++) {
					if (rest.get(i).getMunicipality().getProvinceId().getId() == filter.getProvince().getId()) {
						userList.add(rest.get(i));
						System.out.println(rest.get(i));
					}
				}				
				rest = userList;
			}

			return ResponseEntity.status(HttpStatus.CREATED).body(rest);

		} catch (Exception e) {
			return new ResponseEntity(new Message(e.toString()), HttpStatus.NOT_FOUND);
		}
	}
}
