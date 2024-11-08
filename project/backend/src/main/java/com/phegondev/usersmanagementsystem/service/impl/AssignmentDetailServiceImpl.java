package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.AssignmentDetailDto;
import com.phegondev.usersmanagementsystem.entity.Assignment;
import com.phegondev.usersmanagementsystem.entity.AssignmentDetail;
import com.phegondev.usersmanagementsystem.payloads.AssignmentDetailPayload;
import com.phegondev.usersmanagementsystem.repository.AssignmentDetailRepository;
import com.phegondev.usersmanagementsystem.repository.AssignmentRepository;
import com.phegondev.usersmanagementsystem.service.AssignmentDetailService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.toDtoAssignmentDetailList;

@Service
@RequiredArgsConstructor
public class AssignmentDetailServiceImpl implements AssignmentDetailService {

    private final AssignmentDetailRepository repository;
    private final AssignmentRepository assignmentRepository;

    @Override
    public AssignmentDetailDto create(Long assignmentId) {
        Optional<Assignment> assignment = this.assignmentRepository.findById(assignmentId);
        if (assignment.isPresent()) {
            return DtoUtil.toDtoAssignmentDetail(this.repository.save(new AssignmentDetail(null, null, false, assignment.get(), null, null)));
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void update(Long id, AssignmentDetailPayload payload) {
        Optional<AssignmentDetail> assignmentDetail = this.repository.findById(id);
        if (assignmentDetail.isPresent()) {
            assignmentDetail.get().setResult(payload.result());
            this.repository.save(assignmentDetail.get());
        } else {
            throw new NoSuchElementException();
        }
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


}
