package com.sistemaHelpDesk.appClient.controller;

import com.sistemaHelpDesk.appClient.converter.ServiceConverter;
import com.sistemaHelpDesk.appClient.converter.UserConverter;
import com.sistemaHelpDesk.appClient.dto.CommentDTO;
import com.sistemaHelpDesk.appClient.dto.ServiceDTO;
import com.sistemaHelpDesk.appClient.dto.UserDTO;
import com.sistemaHelpDesk.appClient.service.ServiceService;
import com.sistemaHelpDesk.appClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/service")
public class ServiceController {
    @Autowired
    private ServiceService service;
    @Autowired
    private ServiceConverter converter;

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<ServiceDTO> findAll() {
        return service.findAll().stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/findAllById", method = RequestMethod.POST)
    public List<ServiceDTO> findAllById(@RequestBody List<Integer> list) {
        return service.findAllById(list).stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ServiceDTO findById(@PathVariable("id") int id) {
        return converter.toDTO(service.findById(id));
    }
}
