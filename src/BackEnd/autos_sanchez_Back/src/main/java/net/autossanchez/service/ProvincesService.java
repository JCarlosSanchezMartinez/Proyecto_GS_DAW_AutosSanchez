package net.autossanchez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.Provinces;
import net.autossanchez.repository.ProvinceRepository;

@Service
@Transactional
public class ProvincesService {

	@Autowired
	ProvinceRepository provincesRepository;

	public List<Provinces> getALL() {
		return provincesRepository.findAll();
	}

	public Optional<Provinces> getById(int id) {
		return provincesRepository.findById((long) id);
	}

}
