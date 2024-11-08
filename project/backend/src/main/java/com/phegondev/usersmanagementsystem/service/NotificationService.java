package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.NotificationDto;
import com.phegondev.usersmanagementsystem.payloads.NewNotificationPayload;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NotificationService {
    NotificationDto create(Integer userId, NewNotificationPayload payload);

    void read(Long id);

    void delete(Long id);

    List<NotificationDto> findAll(Integer userId);

    NotificationDto findById(Long id);

    Page<NotificationDto> paginationNotification(Integer userId, int pageNo);
}
