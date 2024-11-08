package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.NotificationDto;
import com.phegondev.usersmanagementsystem.payloads.NewNotificationPayload;
import com.phegondev.usersmanagementsystem.entity.Notification;
import com.phegondev.usersmanagementsystem.entity.Users;
import com.phegondev.usersmanagementsystem.repository.NotificationRepository;
import com.phegondev.usersmanagementsystem.repository.UsersRepo;
import com.phegondev.usersmanagementsystem.service.NotificationService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.toDtoNotification;
import static com.phegondev.usersmanagementsystem.util.DtoUtil.toDtoNotificationList;


@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UsersRepo usersRepo;

    @Override
    public NotificationDto create(Integer userId, NewNotificationPayload payload) {
        Optional<Users> user = usersRepo.findById(userId);
        if (user.isPresent()) {
            Notification notification = notificationRepository.save(new Notification(null, payload.title(), payload.authorFirstname(), payload.authorLastname(), payload.body(), false, user.get()));
            return DtoUtil.toDtoNotification(notification);
        }
        else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void read(Long id) {
        this.notificationRepository.findById(id).ifPresentOrElse(
                note -> {
                    note.setIsRead(true);
                    this.notificationRepository.save(note);
                }, () -> {
                    throw new NoSuchElementException();
                });
    }

    @Override
    public void delete(Long id) {
        this.notificationRepository.deleteById(id);
    }

    @Override
    public List<NotificationDto> findAll(Integer userId) {
        return DtoUtil.toDtoNotificationList(this.notificationRepository.findAllByUserId(userId));
    }

    @Override
    public NotificationDto findById(Long id) {
        AtomicReference<NotificationDto> notificationDto = new AtomicReference<>(new NotificationDto());
        this.notificationRepository.findById(id).ifPresentOrElse( notification -> {
                    notificationDto.set(toDtoNotification(notification));
                }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return notificationDto.get();
    }

    @Override
    public Page<NotificationDto> paginationNotification(Integer userId, int pageNo) {
        List<Notification> notifications = this.notificationRepository.findAllByUserId(userId);
        Pageable pageable = PageRequest.of(pageNo, 10);
        return PageUtil.toPage(toDtoNotificationList(notifications), pageable);
    }
}
