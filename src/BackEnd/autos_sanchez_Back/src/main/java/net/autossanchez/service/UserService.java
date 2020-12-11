package net.autossanchez.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.Provinces;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;
import net.autossanchez.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
	
	 @Autowired
	    UserRepository UserRepository;
	 
		public List<User> getALL(){
			return UserRepository.findAll();
		}
		
	    public Optional<User> getById(int id){
	        return UserRepository.findById(id);
	    }
	    
	    public List<User> getByDni(String dni){
	        return UserRepository.findByDni(dni);
	    }
	    
	    public Optional<User> getByUsername(String username){
	        return UserRepository.findByUsername(username);
	    }

	    public boolean existsByUsername(String username){
	        return UserRepository.existsByUsername(username);
	    }

	    public boolean existsByEmail(String email){
	        return UserRepository.existsByEmail(email);
	    }
	    public boolean existsByDni(String dni){
	        return UserRepository.existsByDni(dni);
	    }

	    public void save(User user){
	    	UserRepository.save(user);
	    }
	    
	    public void delete(User user) {
	    	UserRepository.delete(user);
	    }

		// FILTRO
		


		public List<User> getByMunicipality(Municipality municipality){
			return UserRepository.findByMunicipality(municipality);
		}

					
		public List<User> getByCodeStatus(boolean codeStatus){
			return UserRepository.findByCodeStatus(codeStatus);
		}

}
