package com.phegondev.usersmanagementsystem.repository;

import com.phegondev.usersmanagementsystem.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findAllByToUserId(Integer userId);

    List<Assignment> findAllByFromUserId(Integer userId);

    @Query("SELECT a FROM Assignment a WHERE (a.startDate BETWEEN :startDate AND :endDate) AND a.fromUser.id = :fromUserId")
    List<Assignment> findAllByStartDateBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate, Integer fromUserId);

    @Query("SELECT a FROM Assignment a WHERE a.fromUser.id = :fromUserId AND a.isOpen = true ORDER BY a.startDate ASC")
    List<Assignment> findAllSortedByIsOpen(Integer fromUserId);
}
