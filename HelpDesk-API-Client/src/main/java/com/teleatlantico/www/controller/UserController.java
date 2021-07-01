package com.teleatlantico.www.controller;

import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> list() { return userService.listAll(); }

    @GetMapping("user/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id){
        try{
            User user = userService.get(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public void add(@RequestBody User user){
        //reglas de negocio
        userService.save(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable Integer id){
        try{
            userService.save(user);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) { userService.delete(id); }

}
