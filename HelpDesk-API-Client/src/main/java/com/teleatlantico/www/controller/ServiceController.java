package com.teleatlantico.www.controller;

import com.teleatlantico.www.converter.ServiceConverter;
import com.teleatlantico.www.dto.ServiceDTO;
import com.teleatlantico.www.service.ServiceService;
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
