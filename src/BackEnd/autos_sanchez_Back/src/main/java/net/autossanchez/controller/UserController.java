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

import net.autossanchez.entity.User;
import net.autossanchez.service.UserService;

@RestController

@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UserService userService;

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
	
	
	
	

}
