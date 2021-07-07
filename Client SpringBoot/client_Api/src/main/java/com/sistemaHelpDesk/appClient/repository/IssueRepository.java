package com.sistemaHelpDesk.appClient.repository;

import com.sistemaHelpDesk.appClient.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
    public List<Issue> findAllByUserId(Integer idUser);
}
