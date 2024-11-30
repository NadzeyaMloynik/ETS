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

    Page<AssignmentDto> paginationAssignmentFromUser(Integer fromUserId, int pageNo, int count);

    Page<AssignmentDto> paginationAssignmentToUser(Integer toUserId, int pageNo, int count);

    Page<AssignmentDto> findAllByStartDateBetween(Date startDate, Date endDate, int pageNo, Integer fromUserId);

    Page<AssignmentDto> findAllSortedByIsOpen(int pageNo, Integer fromUserId);
}
