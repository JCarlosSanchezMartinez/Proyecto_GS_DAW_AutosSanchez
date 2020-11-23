package net.autossanchez.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.autossanchez.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>  {
	
	 	Optional<User> findByUsername(String username);
	 	List<User> findByDni(String dni);
	    boolean existsByUsername(String username);
	    boolean existsByEmail(String email);
	    public Optional<User> getByUsername(long id);


}
