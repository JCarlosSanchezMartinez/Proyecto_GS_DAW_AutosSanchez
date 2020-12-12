package net.autossanchez.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.Rol;
import net.autossanchez.enums.RolName;
import net.autossanchez.repository.RolRepository;

@Service
@Transactional
public class RolService {

	@Autowired
	RolRepository rolRepository;

	public Optional<Rol> getByRolName(RolName rolName) {
		return rolRepository.findByRolName(rolName);
	}

	public void save(Rol rol) {
		rolRepository.save(rol);
	}
}
