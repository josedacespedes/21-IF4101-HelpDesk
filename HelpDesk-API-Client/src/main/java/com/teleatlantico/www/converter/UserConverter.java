package com.teleatlantico.www.converter;

import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.domain.Service;
import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.dto.UserDTO;
import com.teleatlantico.www.service.IssueService;
import com.teleatlantico.www.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class UserConverter implements ConverterInterface<User, UserDTO> {
    @Autowired
    IssueService issueService;
    @Autowired
    ServiceService serviceService;

    @Override
    public User toEntity(UserDTO dto) {
        User entity = new User();
        entity.setName(dto.getName());
        entity.setFirstSurname(dto.getFirstSurname());
        entity.setSecondSurname(dto.getSecondSurname());
        entity.setAddress(dto.getAddress());
        entity.setPhone(dto.getPhone());
        entity.setSecondContact(dto.getSecondContact());
        entity.setEmail(dto.getEmail());
        entity.setPass(dto.getPass());
        entity.setIssues(issueService.findAllByUserId(dto.getId()));
        for (Integer id:dto.getServicesById())
            entity.addService(serviceService.findById(id));
        return entity;
    }

    @Override
    public UserDTO toDTO(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setFirstSurname(entity.getFirstSurname());
        dto.setSecondSurname(entity.getSecondSurname());
        dto.setAddress(entity.getAddress());
        dto.setPhone(entity.getPhone());
        dto.setSecondContact(entity.getSecondContact());
        dto.setEmail(entity.getEmail());
        dto.setIssuesById(entity.getIssues().stream()
                .filter(issue -> issue != null)
                .map(Issue::getReportNumber)
                .collect(Collectors.toList()));
        dto.setServicesById(
                entity.getServices().stream()
                .filter(service -> service != null)
                .map(Service::getId)
                .collect(Collectors.toList()));
        return dto;
    }
}
