package net.autossanchez.loginSecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.autossanchez.loginSecurity.entity.User;

import net.autossanchez.loginSecurity.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@Controller

public class AppController {

	@Autowired
	UserDetailsServiceImpl service;
	

	@GetMapping({ "/", "/login"})
	public String index() {
		return "index";
	}

	@GetMapping("/menu")
	public UserDetailsServiceImpl menu() {
		return service;
	}

	@GetMapping("/user")
	public String user() {
		return "user";
	}

	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}

}
