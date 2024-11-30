package com.phegondev.usersmanagementsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.payloads.NewAnswerPayload;
import com.phegondev.usersmanagementsystem.payloads.NewQuestionPayload;
import com.phegondev.usersmanagementsystem.service.AnswerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.testng.reporters.jq.Model;

import java.io.IOException;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
@RequestMapping
public class AnswerController {

    private final AnswerService answerService;

    @Transactional
    @PostMapping("/hr/answer/{questionId}")
    public ResponseEntity<?> createAnswer(@PathVariable Long questionId,  @RequestParam("payload") String payloadJson,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
            try{
                ObjectMapper objectMapper = new ObjectMapper();
                NewAnswerPayload payload = objectMapper.readValue(payloadJson, NewAnswerPayload.class);

                return ResponseEntity.ok(this.answerService.create(questionId, payload, image));
            } catch (NoSuchElementException e) {
                return ResponseEntity.notFound().build();
            }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
    }

    @Transactional
    @PutMapping("/hr/answer/{id}")
    public ResponseEntity<?> updateAnswer(@PathVariable Long id, @RequestParam("payload") String payloadJson,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                NewAnswerPayload payload = objectMapper.readValue(payloadJson, NewAnswerPayload.class);

                this.answerService.updateAnswer(id, payload, image);
                return ResponseEntity.noContent().build();
            }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
    }

    @Transactional
    @DeleteMapping("/hr/answer/{id}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Long id){
        try {
            this.answerService.delete(id);
            return ResponseEntity.noContent().build();
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/hruser/answer-all/{questionId}")
    public ResponseEntity<?> findAllAnswers(@PathVariable Long questionId){
        try {
            return ResponseEntity.ok(this.answerService.findAll(questionId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @GetMapping("/hruser/answer/{id}")
    public ResponseEntity<?> findAnswer(@PathVariable Long id) {
        try {
            AnswerDto answerDto = answerService.findById(id);
            return ResponseEntity.ok(answerDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/hruser/answer/{id}/image")
    public ResponseEntity<?> getAnswerImage(@PathVariable Long id){
        try {
            byte[] image = answerService.getImage(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(image);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/hr/answer/{id}/image")
    public ResponseEntity<?> uploadAnswerImage(@PathVariable Long id,  @RequestParam("image") MultipartFile image){
        try {
            this.answerService.uploadImage(id, image);
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
