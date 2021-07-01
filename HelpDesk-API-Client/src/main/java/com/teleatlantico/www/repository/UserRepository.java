package com.teleatlantico.www.repository;

import com.teleatlantico.www.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.annotation.Resource;

@Resource
public interface UserRepository extends JpaRepository<User, Integer> {

}
