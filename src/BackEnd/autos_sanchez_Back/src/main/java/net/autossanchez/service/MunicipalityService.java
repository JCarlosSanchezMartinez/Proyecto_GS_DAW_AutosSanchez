package net.autossanchez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.Provinces;
import net.autossanchez.repository.MunicipalityRepository;

@Service
@Transactional
public class MunicipalityService {

	@Autowired
	MunicipalityRepository municipalityRepository;

	public List<Municipality> getALL() {
		return municipalityRepository.findAll();
	}

	public Optional<Municipality> getById(int id) {
		return municipalityRepository.findById((long) id);
	}

	public List<Municipality> getByProvinceId(Provinces provinceId) {
		return municipalityRepository.getByProvinceId(provinceId);
	}
}
