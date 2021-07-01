package com.teleatlantico.www.service;


import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public List<Comment> listAll(){ return commentRepository.findAll(); }
    public void save (Comment comment){ commentRepository.save(comment); }
    public Comment get (int id) { return commentRepository.findById(id).get(); }
    public void delete(int id){ commentRepository.deleteById(id); }
}
