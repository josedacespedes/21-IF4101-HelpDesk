package com.teleatlantico.www.service;


import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.exceptions.RecordNotFoundException;
import com.teleatlantico.www.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
