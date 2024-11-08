package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.AssignmentDetailDto;
import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.payloads.AssignmentDetailPayload;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AssignmentDetailService {

    AssignmentDetailDto create (Long assignmentId);

    void update (Long id, AssignmentDetailPayload payload);

    void delete (Long id);

    AssignmentDetailDto get(Long id);

    List<AssignmentDetailDto> getAll(Long assignmentId);

    Page<AssignmentDetailDto> paginationAssignmentDetail(Long assigmentId, int pageNo);
}
