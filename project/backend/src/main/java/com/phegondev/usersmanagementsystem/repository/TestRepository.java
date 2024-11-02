package com.phegondev.usersmanagementsystem.repository;


import com.phegondev.usersmanagementsystem.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    Test findByName(String name);

    List<Test> findAllByNameAndDescription(String name, String description);

    @Query("select t from Test t where t.name like %?1% or t.description like %?1%")
    List<Test> searchByNameOrDescription(String keyword);
}
