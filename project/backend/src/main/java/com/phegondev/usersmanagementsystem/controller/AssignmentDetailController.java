package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.payloads.AssignmentDetailPayload;
import com.phegondev.usersmanagementsystem.service.AssignmentDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class AssignmentDetailController {

    private final AssignmentDetailService assignmentDetailService;

    @Transactional
    @PostMapping("/hr/assigment-detail/{assignmentId}")
    public ResponseEntity<?> createAssignmentDetail (@PathVariable Long assignmentId){
        try {
            return ResponseEntity.ok(this.assignmentDetailService.create(assignmentId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Transactional
    @PutMapping("/hr/assignment-detail/{id}")
    public ResponseEntity<?> updateAssignmentDetail (@PathVariable Long id, @RequestBody AssignmentDetailPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            try {
                this.assignmentDetailService.update(id, payload);
                return ResponseEntity.noContent().build();
            } catch (NoSuchElementException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.internalServerError().build();
            }
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
