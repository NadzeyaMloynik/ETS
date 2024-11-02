package com.phegondev.usersmanagementsystem.repository;


import com.phegondev.usersmanagementsystem.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UsersRepo extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
    List<Users> findByEmailContaining(String email);
}
