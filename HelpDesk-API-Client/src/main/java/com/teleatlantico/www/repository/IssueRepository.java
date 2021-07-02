package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
    public List<Issue> findAllByUserId(Integer idUser);
}
