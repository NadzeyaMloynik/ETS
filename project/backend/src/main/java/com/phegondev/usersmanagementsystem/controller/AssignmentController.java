package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.AssignmentDto;
import com.phegondev.usersmanagementsystem.payloads.NewAssignmentPayload;
import com.phegondev.usersmanagementsystem.payloads.UpdateAssignmentPayload;
import com.phegondev.usersmanagementsystem.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Transactional
    @PostMapping("/hr/assignment/from/{fromUserId}/to/{toUserId}")
    public ResponseEntity<?> createAssignment (@PathVariable Integer fromUserId, @PathVariable Integer toUserId, @RequestBody NewAssignmentPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            return ResponseEntity.ok(this.assignmentService.create(toUserId, fromUserId, payload ));
        }
    }

    @Transactional
    @PutMapping("/hr/assignment/{id}")
    public ResponseEntity<?>  updateCloseDateAssignment(@PathVariable Long id, @RequestBody UpdateAssignmentPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            this.assignmentService.updateCloseDate(id, payload.closeDate());
            return ResponseEntity.noContent().build();
        }
    }

    @Transactional
    @DeleteMapping("/hr/assignment/{id}")
    public ResponseEntity<?> deleteAssignment (@PathVariable Long id){
        this.assignmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/hruser/assignment/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.assignmentService.findById(id));
    }

    @GetMapping("/hruser/from/{fromUserId}")
    public ResponseEntity<?> findAllAssignmentsFromUser(@PathVariable Integer fromUserId){
        return ResponseEntity.ok(this.assignmentService.findAllByFromUser(fromUserId));
    }

    @GetMapping("/hruser/to/{toUserId}")
    public ResponseEntity<?> findAllByToUser(@PathVariable Integer toUserId){
        return ResponseEntity.ok(this.assignmentService.findAllByToUser(toUserId));
    }

    @GetMapping("/hruser/from/{fromUserId}/pagination")
    public ResponseEntity<?> paginationAssignmentsFromUser(@PathVariable Integer fromUserId, @RequestParam(required = false, name = "pageNo") int pageNo,
                                                           @RequestParam(required = false, name = "count") int count){
        return ResponseEntity.ok(this.assignmentService.paginationAssignmentFromUser(fromUserId, pageNo, count));
    }

    @GetMapping("/hruser/to/{toUserId}/pagination")
    public ResponseEntity<?> paginationAssignmentsToUser(@PathVariable Integer toUserId, @RequestParam(required = false, name = "pageNo") int pageNo,
                                                         @RequestParam(required = false, name = "count") int count){
        return ResponseEntity.ok(this.assignmentService.paginationAssignmentToUser(toUserId, pageNo, count));
    }

    @GetMapping("/hr/assignments/by-date-range/{fromUserId}")
    public ResponseEntity<?> getByDateRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(required = false, name = "pageNo") int pageNo,
            @PathVariable Integer fromUserId) {
        return ResponseEntity.ok(this.assignmentService.findAllByStartDateBetween(startDate, endDate, pageNo, fromUserId));
    }

    @GetMapping("/hr/open-assignments/{fromUserId}")
    public ResponseEntity<?> getSortedByIsOpen(@RequestParam(required = false, name = "pageNo") int pageNo,
                                               @PathVariable Integer fromUserId) {
        return ResponseEntity.ok(this.assignmentService.findAllSortedByIsOpen(pageNo, fromUserId));
    }
}
