package net.autossanchez.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.autossanchez.entity.Rol;
import net.autossanchez.enums.RolName;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
	Optional<Rol> findByRolName(RolName rolName);
}
