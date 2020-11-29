package net.autossanchez.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	    public void save(User user){
	    	UserRepository.save(user);
	    }
	    
	    public void delete(User user) {
	    	UserRepository.delete(user);
	    }

		// FILTRO
		/*public List<User> getByNumberPlate(String numberPlate){
			return UserRepository.findByNumberPlate(numberPlate);
		}*/	
		public List<User> getByFirstName(String brand){
			return UserRepository.findByFirstName(brand);
		}
		public List<User> getByLastName(String model){
			return UserRepository.findByLastName(model);
		}
		public List<User> getByCity(String codeStatus){
			return UserRepository.findByCity(codeStatus);
		}
		public List<User> getByCodeStatus(boolean codeStatus){
			return UserRepository.findByCodeStatus(codeStatus);
		}

}
