package com.teleatlantico.www.service;


import com.teleatlantico.www.domain.Service;
import com.teleatlantico.www.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    private ServiceRepository repository;

    public List<Service> findAll() {
        return repository.findAll();
    }

    public List<Service> findAllById(List<Integer> iterable) {
        return repository.findAllById(iterable);
    }

    public Service findById(int id) {
        return repository.findById(id).get();
    }

}
