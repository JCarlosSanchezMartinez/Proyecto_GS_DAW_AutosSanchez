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
import net.autossanchez.entity.User;
import net.autossanchez.entity.UserRepository;


@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor

public class UserController {

	private final UserRepository userRepository;

	/**
	 * Obtenemos todos los Users
	 * 
	 * @return Null si no encuentra el User
	 */
	@GetMapping("/readUserALL")
	public ResponseEntity<Object> obtenerTodos() {
		List<User> rest = userRepository.findAll();

		if (rest.isEmpty()) {

			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(rest);
		}

	}

	/**
	 * Obtenemos un User en base a su ID
	 * 
	 * @param id
	 * @return Null si no encuentra el User
	 */
	@GetMapping("/getUser/{id}")
	public ResponseEntity<Object> obtenerUno(@PathVariable Long id) {
		User rest = userRepository.findById(id).orElse(null);

		if (rest == null) {

			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(rest);
		}

	}

	/**
	 * Insertamos un nuevo User
	 * 
	 * @param nuevo
	 * @return User insertado
	 */
	@PostMapping("/addUser")
	public ResponseEntity<User> nuevoUser(@RequestBody User nuevo) {
		User rest = userRepository.save(nuevo);
		return ResponseEntity.status(HttpStatus.CREATED).body(rest);
	}

	/**
	 * 
	 * @param editar
	 * @param id
	 * @return
	 */
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<?> editarUser(@RequestBody User editar, @PathVariable Long id) {

		return userRepository.findById(id).map(p -> {
			p.setDni(editar.getDni());
			p.setFirst_name(editar.getFirst_name());
			p.setLast_name(editar.getLast_name());
			p.setAddress(editar.getAddress());
			p.setEmail(editar.getEmail());
			p.setPhone(editar.getPhone());
			p.setUsername(editar.getUsername());
			p.setPassword(editar.getPassword());
			

			return ResponseEntity.ok(userRepository.save(p));
		}).orElseGet(() -> {
			return ResponseEntity.notFound().build();
		});

	}

	/**
	 * Borra un User del catálogo en base a su id
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?> borrarUser(@PathVariable Long id) {

		userRepository.deleteById(id);
		return ResponseEntity.noContent().build();

	}
}