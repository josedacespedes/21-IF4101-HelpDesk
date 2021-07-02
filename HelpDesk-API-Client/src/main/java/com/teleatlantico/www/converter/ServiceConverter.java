package com.teleatlantico.www.converter;


import com.teleatlantico.www.domain.Service;
import com.teleatlantico.www.dto.ServiceDTO;
import com.teleatlantico.www.service.IssueService;
import com.teleatlantico.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceConverter implements ConverterInterface<Service, ServiceDTO> {
    @Autowired
    private UserService userService;

    @Autowired
    private IssueService issueService;

    @Override
    public Service toEntity(ServiceDTO dto) {
        Service entity = new Service();
        entity.setName(dto.getName());
        /*
        entity.setUsers(userService.findAllById(dto.getUsersById()));
        entity.setIssues(issueService.findAllById(dto.getUsersById()));
         */
        return entity;
    }

    @Override
    public ServiceDTO toDTO(Service entity) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        /*
        dto.setUsersById(entity.getUsers().stream()
                .filter(user -> user != null)
                .map(User::getId)
                .collect(Collectors.toList()));
        dto.setIssuesById(entity.getIssues().stream()
                .filter(issue -> issue != null)
                .map(Issue::getReportNumber)
                .collect(Collectors.toList()));
         */
        return dto;
    }
}
