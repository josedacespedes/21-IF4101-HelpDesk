package com.teleatlantico.www.repository;


import com.teleatlantico.www.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    public List<Comment> findAllByIssueReportNumber(Integer reportNumber);
}
