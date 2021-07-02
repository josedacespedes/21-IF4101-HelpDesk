package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail (String email);
    boolean existsByEmail (String email);
}
