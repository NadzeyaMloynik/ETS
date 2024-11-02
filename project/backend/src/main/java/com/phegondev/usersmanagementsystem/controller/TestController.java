package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.test.NewTestPayload;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.service.TestService;
import com.phegondev.usersmanagementsystem.service.impl.TestServiceImpl;
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

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class TestController {
    private final TestService testService;

    @GetMapping("/hruser/test")
    public ResponseEntity<Page<Test>> getAllTests(@RequestParam(required = false, name = "pageNo") int pageNo, @RequestParam(required = false, name = "keyword") String keyword) {
        return ResponseEntity.ok(testService.searchTests(pageNo, keyword));
    }

    @GetMapping("/hruser/test/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable Long id) {
        try {
            Test test = testService.findTest(id).orElseThrow(() -> new NoSuchFieldException("Test not found with id: " + id));
            return ResponseEntity.ok(test);
        } catch (NoSuchFieldException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Transactional
    @PostMapping("/hr/test")
    public ResponseEntity<?> addTest(@Valid @RequestBody NewTestPayload payload,
                                     BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            return ResponseEntity.ok(testService.create(payload.title(), payload.description()));
        }
    }

    @DeleteMapping("/hr/test/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        this.testService.deleteTest(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PatchMapping("/hr/test/{id}")
    public ResponseEntity<?> updateTest (@PathVariable Long id, @Valid @RequestBody NewTestPayload payload,
                                         BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            this.testService.updateTest(id, payload.title(), payload.description());
            return ResponseEntity.noContent().build();
        }
    }
}

