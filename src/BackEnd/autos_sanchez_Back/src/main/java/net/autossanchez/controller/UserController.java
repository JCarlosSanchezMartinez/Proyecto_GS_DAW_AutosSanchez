package net.autossanchez.controller;

import java.util.List;

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
import net.autossanchez.entity.User;
import net.autossanchez.service.UserService;

@RestController

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	/* Obtenemos todos los USUARIOS */

	@GetMapping("/getUserList")
	public ResponseEntity<User> getUserList() {
		List<User> rest = userService.getALL();

		return new ResponseEntity(rest, HttpStatus.OK);
	}

	/* Obtenemos todos los USUARIOS por ID */
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

	/* Actualizamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody User user) {

		if (userService.existsByUsername(user.getUsername())) {
			User rest = userService.getById(id).get();

			rest.setDni(user.getDni());
			rest.setFirstName(user.getFirstName());
			rest.setLastName(user.getLastName());
			rest.setAddress(user.getAddress());
			rest.setCity(user.getCity());
			rest.setPhone(user.getPhone());
			rest.setEmail(user.getEmail());
			rest.setUsername(user.getUsername());
			rest.setPassword(passwordEncoder.encode(user.getPassword()));
			rest.setCodeStatus(user.isCodeStatus());
			userService.save(rest);
			return ResponseEntity.ok(rest);
		}
		return (ResponseEntity<Object>) ResponseEntity.notFound();
	}

	/* Eliminamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) {
		
		try {
			User user = userService.getById(id).orElse(null);
			user.setCodeStatus(false);
			userService.save(user);
			
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		
		return ResponseEntity.noContent().build();

	}
	
	/* Reactivamos VEHICULO */
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/reactivateUser/{id}")
	public ResponseEntity<?> reactivate(@PathVariable int id) {
		
		try {
			User user = userService.getById(id).orElse(null);
			user.setCodeStatus(true);
			userService.save(user);
			
		} catch (Exception e) {
			return (ResponseEntity<Object>) ResponseEntity.notFound();
		}
		
		return ResponseEntity.noContent().build();

	}

}
