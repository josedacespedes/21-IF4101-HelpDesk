package com.teleatlantico.www.converter;

import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.dto.IssueDTO;
import com.teleatlantico.www.service.CommentService;
import com.teleatlantico.www.service.ServiceService;
import com.teleatlantico.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class IssueConverter implements ConverterInterface<Issue, IssueDTO> {
    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @Autowired
    ServiceService serviceService;

    @Override
    public Issue toEntity(IssueDTO dto) {
        Issue entity = new Issue();
        entity.setDescription(dto.getDescription());
        entity.setRegisterTime(dto.getRegisterTime());
        entity.setAddress(dto.getAddress());
        entity.setContactPhone(dto.getContactPhone());
        entity.setContactEmail(dto.getContactEmail());
        entity.setStatus(dto.getStatus());
        entity.setSupportUserAssigned(dto.getSupportUserAssigned());
        entity.setUser(userService.findById(dto.getUserById()));
        entity.setService(serviceService.findById(dto.getServiceById()));
        entity.setComments(commentService.findAllByIssueReportNumber(dto.getReportNumber()));
        return entity;
    }

    @Override
    public IssueDTO toDTO(Issue entity) {
        IssueDTO dto = new IssueDTO();
        dto.setReportNumber(entity.getReportNumber());
        dto.setDescription(entity.getDescription());
        dto.setRegisterTime(entity.getRegisterTime());
        dto.setAddress(entity.getAddress());
        dto.setContactPhone(entity.getContactPhone());
        dto.setContactEmail(entity.getContactEmail());
        dto.setStatus(entity.getStatus());
        dto.setSupportUserAssigned(entity.getSupportUserAssigned());
        dto.setUserById(entity.getUser().getId());
        dto.setServiceById(entity.getService().getId());
        dto.setCommentsById(entity.getComments().stream()
                .filter(comment -> comment != null)
                .map(Comment::getId)
                .collect(Collectors.toList()));
        return dto;
    }
}
