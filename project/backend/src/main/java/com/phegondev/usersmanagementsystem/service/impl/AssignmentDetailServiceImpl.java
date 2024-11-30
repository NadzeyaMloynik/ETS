package com.phegondev.usersmanagementsystem.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.phegondev.usersmanagementsystem.dto.AssignmentDetailDto;
import com.phegondev.usersmanagementsystem.entity.*;
import com.phegondev.usersmanagementsystem.payloads.CountAnswerResultPayload;
import com.phegondev.usersmanagementsystem.repository.AssignmentDetailRepository;
import com.phegondev.usersmanagementsystem.repository.AssignmentRepository;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.service.AssignmentDetailService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.toDtoAssignmentDetailList;

@Service
@RequiredArgsConstructor
public class AssignmentDetailServiceImpl implements AssignmentDetailService {

    private final AssignmentDetailRepository repository;
    private final AssignmentRepository assignmentRepository;
    private final TestRepository testRepository;

    @Override
    public List<AssignmentDetailDto> create(Long assignmentId, List<Long> testIds) {
        Assignment assignment = this.assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new NoSuchElementException("Assignment with ID " + assignmentId + " not found"));

        List<AssignmentDetail> assignmentDetails = new ArrayList<>();

        for (Long testId : testIds) {
            Test test = testRepository.findById(testId)
                    .orElseThrow(() -> new NoSuchElementException("Test with ID " + testId + " not found"));

            Integer maxResult = 0;
            for (Question question : test.getQuestions()) {
                for (Answer answer : question.getAnswers()) {
                    if (answer.getIsCorrect()){
                        maxResult += answer.getPoints();
                    }
                }
            }

            AssignmentDetail assignmentDetail = new AssignmentDetail(
                    null, null, maxResult,false, assignment, test, null, null
            );
            assignmentDetails.add(assignmentDetail);
        }
        return DtoUtil.toDtoAssignmentDetailList(this.repository.saveAll(assignmentDetails));
    }

    @Override
    public void delete(Long id) {
        this.repository.deleteById(id);
    }

    @Override
    public AssignmentDetailDto get(Long id) {
        Optional<AssignmentDetail> assignmentDetail = this.repository.findById(id);
        if (assignmentDetail.isPresent()) {
            return DtoUtil.toDtoAssignmentDetail(assignmentDetail.get());
        }
        throw new NoSuchElementException();
    }

    @Override
    public List<AssignmentDetailDto> getAll(Long assignmentId) {
        List<AssignmentDetail> assignmentDetails = this.repository.findAllByAssignmentId(assignmentId);
        return DtoUtil.toDtoAssignmentDetailList(assignmentDetails);
    }

    @Override
    public Page<AssignmentDetailDto> paginationAssignmentDetail(Long assigmentId, int pageNo) {
        List<AssignmentDetail> assignmentDetails = this.repository.findAllByAssignmentId(assigmentId);
        Pageable pageable = PageRequest.of(pageNo, 10);
        return PageUtil.toPage(toDtoAssignmentDetailList(assignmentDetails), pageable);
    }
    @Override
    public void passTestAssignmentDetail(Long assignmentDetailId, Map<Long, List<CountAnswerResultPayload>> payloads) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(payloads);
        Integer result = 0;

        for (Map.Entry<Long, List<CountAnswerResultPayload>> entry : payloads.entrySet()) {
            Boolean isCorrect = true;
            Integer tempResult = 0;
            for (CountAnswerResultPayload payload : entry.getValue()) {
                if (payload.isCorrect()) {
                    tempResult += payload.points();
                } else {
                    isCorrect = false;
                    break;
                }
            }
            if(isCorrect){
                result += tempResult;
            }
        }

        Optional<AssignmentDetail> assignmentDetail = Optional.ofNullable(repository.findById(assignmentDetailId)
                .orElseThrow(() -> new NoSuchElementException("Assignment detail with ID " + assignmentDetailId + " not found")));

        AssignmentDetail newAssignmentDetail = assignmentDetail.get();
        newAssignmentDetail.setResult(result);
        newAssignmentDetail.setIsPassed(true);
        newAssignmentDetail.setTestAnswers(json);
        this.repository.save(newAssignmentDetail);
    }



}
