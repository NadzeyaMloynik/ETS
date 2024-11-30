package com.phegondev.usersmanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phegondev.usersmanagementsystem.payloads.NewQuestionPayload;
import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/hruser/question/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable Long id) {
        try {
            QuestionDto question = questionService.findById(id);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/hruser/question/{testId}/pages")
    public ResponseEntity<Page<QuestionDto>> getPaginationQuestions(@PathVariable Long testId,@RequestParam(required = false, name = "pageNo") int pageNo,
                                                                    @RequestParam(required = false, name = "count") int count) {
        return ResponseEntity.ok(questionService.paginationQuestions(testId, pageNo, count));
    }


    @Transactional
    @PostMapping("/hr/question/{testId}")
    public ResponseEntity<?> saveQuestion(@PathVariable Long testId, @RequestParam("payload") String payloadJson,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                NewQuestionPayload payload = objectMapper.readValue(payloadJson, NewQuestionPayload.class);

                return ResponseEntity.ok(this.questionService.create(testId, payload.question(), image));
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Transactional
    @PatchMapping("/hr/question/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestParam("payload") String payloadJson,
                                            @RequestParam(value = "image", required = false) MultipartFile image){
        try {
        ObjectMapper objectMapper = new ObjectMapper();
        NewQuestionPayload payload = objectMapper.readValue(payloadJson, NewQuestionPayload.class);

        this.questionService.update(id, payload.question(), image);
            return ResponseEntity.noContent().build();
    }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
    }

    @Transactional
    @DeleteMapping("/hr/question/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        this.questionService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/hruser/question/{id}/image")
    public ResponseEntity<?> getQuestionImage(@PathVariable Long id){
        try {
            byte[] image = questionService.getImage(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(image);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/hr/question/{id}/image")
    public ResponseEntity<?> uploadQuestionImage(@PathVariable Long id,  @RequestParam("image") MultipartFile image){
        try {
            this.questionService.uploadImage(id, image);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
