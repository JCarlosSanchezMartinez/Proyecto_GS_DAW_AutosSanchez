package net.autossanchez.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import net.autossanchez.dto.JwtDto;
import net.autossanchez.dto.LoginUser;
import net.autossanchez.dto.Message;
import net.autossanchez.dto.UserNew;
import net.autossanchez.entity.Rol;
import net.autossanchez.entity.User;
import net.autossanchez.enums.RolName;
import net.autossanchez.jwt.JwtProvider;
import net.autossanchez.service.RolService;
import net.autossanchez.service.UserService;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RolService rolService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@PostMapping("/addUser")
	public ResponseEntity<?> nuevo(@Valid @RequestBody UserNew userNew, BindingResult bindingResult ){
		if(bindingResult.hasErrors())
			return new ResponseEntity(new Message("ERROR en campos o email"), HttpStatus.BAD_REQUEST);
		if(userService.existsByUsername(userNew.getUsername()))
			return new ResponseEntity(new Message("ERROR nombre de usuario ya existe"), HttpStatus.BAD_REQUEST);
		if(userService.existsByEmail(userNew.getEmail()))
			return new ResponseEntity(new Message("ERROR el Email ya existe"), HttpStatus.BAD_REQUEST);
		User user = new User(userNew.getFirstName(),userNew.getUsername(),userNew.getEmail(),passwordEncoder.encode(userNew.getPassword()),userNew.getMunicipality());
		
		Set<Rol> roles = new HashSet<>();
		roles.add(rolService.getByRolName(RolName.ROLE_USER).get());
		if(userNew.getRoles().contains("admin"))
			roles.add(rolService.getByRolName(RolName.ROLE_ADMIN).get());
		user.setRoles(roles);
		userService.save(user);
		return new ResponseEntity(new Message("Usuario Guardado"), HttpStatus.CREATED);
		
	}

	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUser loginUser, BindingResult bindingResult){
		if(bindingResult.hasErrors())
			return new ResponseEntity(new Message("ERROR campos"), HttpStatus.BAD_REQUEST);
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(),loginUser.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		JwtDto jwtDto = new JwtDto(jwt,userDetails.getUsername(),userDetails.getAuthorities());
	return new ResponseEntity(jwtDto, HttpStatus.OK);
	}
}
