package com.phegondev.usersmanagementsystem.repository;


import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface UsersRepo extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
    List<Users> findByEmailContaining(String email);

    @Query("select u from Users u where (LOWER(u.name) like LOWER(CONCAT('%', ?1, '%')) or LOWER(u.lastname) like LOWER(CONCAT('%', ?1, '%'))) and u.role = 'USER'")
    List<Users> searchByNameOrLastname(String keyword);

}
