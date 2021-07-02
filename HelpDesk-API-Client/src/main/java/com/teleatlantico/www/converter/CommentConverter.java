package com.teleatlantico.www.converter;

import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.dto.CommentDTO;
import com.teleatlantico.www.service.IssueService;
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
