package com.phegondev.usersmanagementsystem.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.phegondev.usersmanagementsystem.dto.AssignmentDetailDto;
import com.phegondev.usersmanagementsystem.payloads.CountAnswerResultPayload;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface AssignmentDetailService {

    List<AssignmentDetailDto> create (Long assignmentId, List<Long> testIds);

    void delete (Long id);

    AssignmentDetailDto get(Long id);

    List<AssignmentDetailDto> getAll(Long assignmentId);

    Page<AssignmentDetailDto> paginationAssignmentDetail(Long assigmentId, int pageNo);

    void passTestAssignmentDetail(Long assignmentDetailId, Map<Long, List<CountAnswerResultPayload>> payloads) throws JsonProcessingException;

}
