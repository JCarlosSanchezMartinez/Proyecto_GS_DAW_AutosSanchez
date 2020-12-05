package net.autossanchez.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.Provinces;
import net.autossanchez.entity.Rol;
import net.autossanchez.enums.RolName;

@Repository
public interface MunicipalityRepository extends JpaRepository<Municipality, Long> {
	  List<Municipality> getByProvinceId(Provinces province);

}
