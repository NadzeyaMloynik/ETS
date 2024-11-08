package com.phegondev.usersmanagementsystem.repository;

import com.phegondev.usersmanagementsystem.entity.AssignmentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentDetailRepository extends JpaRepository<AssignmentDetail, Long> {
    List<AssignmentDetail> findAllByAssignmentId(Long assignmentId);
}
