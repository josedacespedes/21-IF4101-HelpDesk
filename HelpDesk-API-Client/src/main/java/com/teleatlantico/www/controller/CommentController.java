package com.teleatlantico.www.controller;

import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/comments")
    public List<Comment> list() { return commentService.listAll(); }

    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> get(@PathVariable Integer id){
        try{
            Comment comment = commentService.get(id);
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } catch (NoSuchElementException e){
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public void add(@RequestBody Comment comment){
        //reglas
        commentService.save(comment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> update(@RequestBody Comment comment, @PathVariable Integer id){
        try{
            commentService.save(comment);
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) { commentService.delete(id); }
}
