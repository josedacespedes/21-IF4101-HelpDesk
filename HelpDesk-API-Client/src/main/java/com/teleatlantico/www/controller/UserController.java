package com.teleatlantico.www.controller;


import com.teleatlantico.www.converter.UserConverter;
import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.dto.UserDTO;
import com.teleatlantico.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/user")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private UserConverter converter;

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public UserDTO save(@RequestBody UserDTO dto) {
        User entity = converter.toEntity(dto);
        return converter.toDTO(service.save(entity));
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<UserDTO> findAll() {
        return service.findAll().stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/findAllById", method = RequestMethod.POST)
    public List<UserDTO> findAllById(@RequestBody List<Integer> list) {
        return service.findAllById(list).stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public UserDTO findById(@PathVariable("id") int id) {
        return converter.toDTO(service.findById(id));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public UserDTO update(@PathVariable("id") int id,
                          @RequestBody UserDTO dto) {
        User entity = converter.toEntity(dto);
        entity.setId(id);
        return converter.toDTO(service.update(converter.toEntity(dto)));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id) {
        service.delete(id);
    }
}
