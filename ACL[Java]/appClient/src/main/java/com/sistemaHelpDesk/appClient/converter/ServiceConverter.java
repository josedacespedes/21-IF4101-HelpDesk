package com.sistemaHelpDesk.appClient.converter;

import com.sistemaHelpDesk.appClient.domain.Issue;
import com.sistemaHelpDesk.appClient.domain.Service;
import com.sistemaHelpDesk.appClient.domain.User;
import com.sistemaHelpDesk.appClient.dto.ServiceDTO;
import com.sistemaHelpDesk.appClient.service.IssueService;
import com.sistemaHelpDesk.appClient.service.UserService;
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
