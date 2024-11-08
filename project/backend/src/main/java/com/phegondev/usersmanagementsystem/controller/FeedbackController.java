package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.FeedbackDto;
import com.phegondev.usersmanagementsystem.payloads.NewAssignmentPayload;
import com.phegondev.usersmanagementsystem.payloads.NewFeedbackPayload;
import com.phegondev.usersmanagementsystem.service.FeedbackService;
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
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Transactional
    @PostMapping("/hr/feedback/{assignmentDetailId}")
    public ResponseEntity<?> createFeedback (@PathVariable Long assignmentDetailId, @RequestBody NewFeedbackPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            try{
                return ResponseEntity.ok(feedbackService.create(assignmentDetailId, payload));
            } catch (NoSuchElementException e){
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    }

    @Transactional
    @PutMapping("/hr/feedback/{id}")
    public ResponseEntity<?> update (@PathVariable Long id, @RequestBody NewFeedbackPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            try{
                this.feedbackService.update(id, payload);
                return ResponseEntity.noContent().build();
            } catch (NoSuchElementException e){
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }

    @GetMapping("/hruser/feedback/{assignmentDetailId}")
    public ResponseEntity<?> getFeedback (Long assignmentDetailId){
        try{
            return ResponseEntity.ok(this.feedbackService.getFeedback(assignmentDetailId));
        } catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
