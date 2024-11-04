package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.NewQuestionPayload;
import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/adminuser/question/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable Long id) {
        try {
            QuestionDto question = questionService.findById(id);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/adminuser/question/{testId}/pages")
    public ResponseEntity<Page<QuestionDto>> getPaginationQuestions(@PathVariable Long testId,@RequestParam(required = false, name = "pageNo") int pageNo) {
        return ResponseEntity.ok(questionService.paginationQuestions(testId, pageNo));
    }

    @GetMapping("/adminuser/question/{testId}")
    public ResponseEntity<?> getAllTestQuestions(@PathVariable Long testId) {
        return ResponseEntity.ok(questionService.findAll(testId));
    }

    @Transactional
    @PostMapping("/hr/question/{testId}")
    public ResponseEntity<?> saveQuestion(@PathVariable Long testId, @Valid @RequestBody NewQuestionPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            return ResponseEntity.ok(this.questionService.create(testId, payload.question()));
        }
    }

    @Transactional
    @PatchMapping("/hr/question/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @Valid @RequestBody NewQuestionPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            this.questionService.update(id, payload.question());
            return ResponseEntity.noContent().build();
        }
    }

    @Transactional
    @DeleteMapping("/hr/question/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        this.questionService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
