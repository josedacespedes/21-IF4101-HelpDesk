package com.sistemaHelpDesk.appClient.service;

import com.sistemaHelpDesk.appClient.domain.Comment;
import com.sistemaHelpDesk.appClient.domain.User;
import com.sistemaHelpDesk.appClient.exceptions.RecordNotFoundException;
import com.sistemaHelpDesk.appClient.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;

    public Comment save(Comment entity) {
        return repository.save(entity);
    }

    public List<Comment> findAll() {
        return repository.findAll();
    }

    public List<Comment> findAllByIssueReportNumber(Integer reportNumber) {
        return repository.findAllByIssueReportNumber(reportNumber);
    }

    public Comment findById(Integer id) {
        return repository.findById(id).get();
    }

    public Comment update(Comment entity) {
        if(repository.findById(entity.getId()).get() != null) {
            return repository.save(entity);
        } else throw new RecordNotFoundException(User.class.getName());
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
