package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.AssignmentDto;
import com.phegondev.usersmanagementsystem.payloads.NewAssignmentPayload;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface AssignmentService {
    AssignmentDto create (Integer toUserId, Integer fromUserId, NewAssignmentPayload payload);

    void updateCloseDate(Long id, Date closeDate);

    void delete (Long id);

    AssignmentDto findById(Long id);

    List<AssignmentDto> findAllByFromUser(Integer fromUserId);

    List<AssignmentDto> findAllByToUser(Integer toUserId);

    Page<AssignmentDto> paginationAssignmentFromUser(Integer fromUserId, int pageNo);

    Page<AssignmentDto> paginationAssignmentToUser(Integer toUserId, int pageNo);
}
