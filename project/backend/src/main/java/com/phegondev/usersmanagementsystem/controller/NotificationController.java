package com.phegondev.usersmanagementsystem.controller;

import com.phegondev.usersmanagementsystem.dto.NotificationDto;
import com.phegondev.usersmanagementsystem.payloads.NewNotificationPayload;
import com.phegondev.usersmanagementsystem.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
public class NotificationController {
    private final NotificationService notificationService;

    @Transactional
    @PostMapping("/hr/notification/{userId}")
    public ResponseEntity<?> createNotification(@PathVariable Integer userId, @RequestBody NewNotificationPayload payload, BindingResult bindingResult)
            throws BindException {
        if (bindingResult.hasErrors()) {
            if (bindingResult instanceof BindException exception) {
                throw exception;
            } else {
                throw new BindException(bindingResult);
            }
        } else {
            return ResponseEntity.ok(this.notificationService.create(userId, payload));
        }
    }

    @Transactional
    @PutMapping("/hruser/notification/{id}")
    public ResponseEntity<?> readNotification(@PathVariable Long id){
        try{
            this.notificationService.read(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e){
           return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    @DeleteMapping("/hr/notification/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id){
        this.notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/hruser/notification/{userId}/all")
    public ResponseEntity<?> findAllNotifications(@PathVariable Integer userId){
        return ResponseEntity.ok(this.notificationService.findAll(userId));
    }

    @GetMapping("/hruser/notification/{id}")
    public ResponseEntity<?> findByIdNotification(@PathVariable Long id){
        return ResponseEntity.ok(this.notificationService.findById(id));
    }

    @GetMapping("/hruser/notification/{userId}/pagination")
    public ResponseEntity<?> paginationNotification(@PathVariable Integer userId,
            @RequestParam(name = "pageNo", defaultValue = "0") int pageNo
    ) {
        return ResponseEntity.ok(this.notificationService.paginationNotification(userId, pageNo));
    }
}
