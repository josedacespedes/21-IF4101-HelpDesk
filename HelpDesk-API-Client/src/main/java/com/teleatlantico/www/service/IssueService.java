package com.teleatlantico.www.service;

import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    public List<Issue> listAll(){ return issueRepository.findAll(); }
    public void save (Issue issue){ issueRepository.save(issue); }
    public Issue get (int id) { return issueRepository.findById(id).get(); }
    public void delete(int id) { issueRepository.deleteById(id); }
}
