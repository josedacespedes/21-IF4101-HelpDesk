package com.sistemaHelpDesk.appClient.service;

import com.sistemaHelpDesk.appClient.domain.Comment;
import com.sistemaHelpDesk.appClient.domain.User;
import com.sistemaHelpDesk.appClient.exceptions.RecordNotFoundException;
import com.sistemaHelpDesk.appClient.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.sistemaHelpDesk.appClient.domain.Service;

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
