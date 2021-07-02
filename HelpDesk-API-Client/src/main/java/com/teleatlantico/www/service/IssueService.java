package com.teleatlantico.www.service;

import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.exceptions.RecordNotFoundException;
import com.teleatlantico.www.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRepository repository;

    public Issue save(Issue entity) {
        return repository.save(entity);
    }

    public List<Issue> findAll() {
        return repository.findAll();
    }

    public List<Issue> findAllByUserId(Integer userId){
        return repository.findAllByUserId(userId);
    }

    public Issue findById(int id) {
        return repository.findById(id).get();
    }

    public Issue update(Issue entity) {
        if(repository.findById(entity.getReportNumber()).get() != null) {
            return repository.save(entity);
        } else throw new RecordNotFoundException(Issue.class.getName());
    }

    public void updateStatus(int reportNumber, String status) {
        if(this.repository.existsById(reportNumber)) {
            Issue issue = this.repository.findById(reportNumber).get();
            issue.setStatus(status);
            this.repository.save(issue);
        } throw new RecordNotFoundException(Issue.class.getName());
    }

    public void updateSupporterAssigned(int reportNumber, String supportAssigned) {
        if(this.repository.existsById(reportNumber)) {
            Issue issue = this.repository.findById(reportNumber).get();
            issue.setSupportUserAssigned(supportAssigned);
            this.repository.save(issue);
        } throw new RecordNotFoundException(Issue.class.getName());
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
