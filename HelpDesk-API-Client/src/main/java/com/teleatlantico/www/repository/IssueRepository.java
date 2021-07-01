package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.Resource;

@Resource
public interface IssueRepository extends JpaRepository<Issue, Integer> {

}
