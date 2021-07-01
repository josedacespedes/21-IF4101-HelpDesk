package com.teleatlantico.www.controller;

import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/issue")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping("/issues")
    public List<Issue> list() { return issueService.listAll(); }

    @GetMapping("/issue/{id}")
    public ResponseEntity<Issue> get(@PathVariable Integer id){
        try{
            Issue issue = issueService.get(id);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Issue>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public void add(@RequestBody Issue issue){
        //reglas

        issueService.save(issue);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Issue> update(@RequestBody Issue issue, @PathVariable Integer id){
        try{
            issueService.save(issue);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Issue>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) { issueService.delete(id); }

}
