package com.teleatlantico.www.service;

import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> listAll(){ return userRepository.findAll(); }
    public void save (User user){ userRepository.save(user); }
    public User get (int id) { return userRepository.findById(id).get(); }
    public void delete(int id) { userRepository.deleteById(id); }
}
