package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.AssignmentDetailDto;
import com.phegondev.usersmanagementsystem.payloads.CountAnswerResultPayload;
import com.phegondev.usersmanagementsystem.service.AssignmentDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class AssignmentDetailController {

    private final AssignmentDetailService assignmentDetailService;

    @Transactional
    @PostMapping("/hr/assignment-detail/{assignmentId}")
    public ResponseEntity<?> createAssignmentDetail(
            @PathVariable Long assignmentId,
            @RequestBody List<Long> testIds) {

        try {
            List<AssignmentDetailDto> createdAssignmentDetails = this.assignmentDetailService.create(assignmentId, testIds);
            return ResponseEntity.ok(createdAssignmentDetails);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Transactional
    @PutMapping("/user/assignment-detail/{assignmentId}")
    public ResponseEntity<?> passTestAssignmentDetail(@PathVariable Long assignmentId, @RequestBody Map<Long, List<CountAnswerResultPayload>> payloads){
        try {
            this.assignmentDetailService.passTestAssignmentDetail(assignmentId, payloads);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Transactional
    @DeleteMapping("/hr/assignment-detail/{id}")
    public ResponseEntity<?> deleteAssignmentDetail (@PathVariable Long id){
        this.assignmentDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/hruser/assignment-detail/{id}")
    public ResponseEntity<?> getAssignmentDetail(@PathVariable Long id){
        return ResponseEntity.ok(this.assignmentDetailService.get(id));
    }

    @GetMapping("/hruser/assignment-detail-all/{assignmentId}")
    public ResponseEntity<?> getAllAssignmentDetail(@PathVariable Long assignmentId){
        return ResponseEntity.ok(this.assignmentDetailService.getAll(assignmentId));
    }

    @GetMapping("/hruser/assignment-detail/{assigmentId}/pagination")
    public ResponseEntity<?> paginationAssignmentDetail(@PathVariable Long assigmentId, int pageNo){
        return ResponseEntity.ok(this.assignmentDetailService.paginationAssignmentDetail(assigmentId, pageNo));
    }
}
