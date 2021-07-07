package com.sistemaHelpDesk.appClient.converter;

import com.sistemaHelpDesk.appClient.domain.Comment;
import com.sistemaHelpDesk.appClient.dto.CommentDTO;
import com.sistemaHelpDesk.appClient.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentConverter implements ConverterInterface<Comment, CommentDTO> {
    @Autowired
    private IssueService issueService;

    @Override
    public Comment toEntity(CommentDTO dto) {
        Comment entity = new Comment();
        entity.setDescription(dto.getDescription());
        entity.setCommentTime(dto.getCommentTime());
        entity.setIssue(issueService.findById(dto.getIssueByReportNumber()));
        return entity;
    }

    @Override
    public CommentDTO toDTO(Comment entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setCommentTime(entity.getCommentTime());
        dto.setIssueByReportNumber(entity.getIssue().getReportNumber());
        return dto;
    }
}
