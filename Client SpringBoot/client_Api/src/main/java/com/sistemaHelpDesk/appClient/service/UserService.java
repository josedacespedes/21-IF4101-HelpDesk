package com.sistemaHelpDesk.appClient.service;

import com.sistemaHelpDesk.appClient.domain.Comment;
import com.sistemaHelpDesk.appClient.domain.User;
import com.sistemaHelpDesk.appClient.exceptions.EmailExistException;
import com.sistemaHelpDesk.appClient.exceptions.RecordNotFoundException;
import com.sistemaHelpDesk.appClient.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@org.springframework.stereotype.Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    PasswordEncoder encoder;

    public User save(User entity) {
        if(repository.existsByEmail(entity.getEmail())) throw new EmailExistException();
        //entity.setPass(encoder.encode(entity.getPass()));
        return repository.save(entity);
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public List<User> findAllById(List<Integer> iterable) {
        return repository.findAllById(iterable);
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User findById(int id) {
        return repository.findById(id).get();
    }

    public User update(User entity) {
        User entityToUpdate = repository.findById(entity.getId()).get();
        if(entityToUpdate != null) {
            entity.setPass(entityToUpdate.getPass());
            return repository.save(entity);
        } else throw new RecordNotFoundException(User.class.getName());
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
