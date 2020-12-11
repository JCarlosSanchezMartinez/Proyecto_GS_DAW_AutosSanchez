package net.autossanchez.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.Provinces;
import net.autossanchez.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>  {
	
	 	Optional<User> findByUsername(String username);
	 	List<User> findByDni(String dni);
	    boolean existsByUsername(String username);
	    boolean existsByEmail(String email);
	    boolean existsByDni(String dni);
	    public Optional<User> getByUsername(long id);
		List<User> findByMunicipality(Municipality municipality);
		List<User> findByCodeStatus(boolean codeStatus);


}
