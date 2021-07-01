package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.Resource;

@Resource
public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
