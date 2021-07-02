package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    public List<Comment> findAllByIssueReportNumber(Integer reportNumber);
}
