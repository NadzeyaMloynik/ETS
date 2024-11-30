package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.AssignmentDto;
import com.phegondev.usersmanagementsystem.payloads.NewAssignmentPayload;
import com.phegondev.usersmanagementsystem.entity.Assignment;
import com.phegondev.usersmanagementsystem.entity.Users;
import com.phegondev.usersmanagementsystem.payloads.NewNotificationPayload;
import com.phegondev.usersmanagementsystem.repository.AssignmentRepository;
import com.phegondev.usersmanagementsystem.repository.UsersRepo;
import com.phegondev.usersmanagementsystem.service.AssignmentService;
import com.phegondev.usersmanagementsystem.service.NotificationService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.*;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final UsersRepo usersRepo;
    private final NotificationService notificationService;

    @Override
    public AssignmentDto create(Integer toUserId, Integer fromUserId, NewAssignmentPayload payload) {
        Optional<Users> toUser = usersRepo.findById(toUserId);
        Optional<Users> fromUser = usersRepo.findById(fromUserId);

        if (toUser.isPresent() && fromUser.isPresent()) {
            Assignment assignment = new Assignment(null, payload.startDate(), payload.closeDate(), false, payload.name(),toUser.get(), fromUser.get(), null);
            this.notificationService.create(toUserId, new NewNotificationPayload("Новое задание", "Создано задание: " + assignment.getName() + " закрыто для выполнения."));
            return DtoUtil.toDtoAssignment(this.assignmentRepository.save(assignment));
        }
        else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void updateCloseDate(Long id, Date closeDate) {
        this.assignmentRepository.findById(id)
                .ifPresentOrElse(a -> {
                    a.setCloseDate(closeDate);
                    this.assignmentRepository.save(a);
                }, () -> {
                    throw new NoSuchElementException();
                });
    }

    @Override
    public void delete(Long id) {
        this.assignmentRepository.deleteById(id);
    }

    @Override
    public AssignmentDto findById(Long id) {
        AtomicReference<AssignmentDto> assignmentDto = new AtomicReference<>(new AssignmentDto());
        this.assignmentRepository.findById(id).ifPresentOrElse( assignment -> {
                    assignmentDto.set(toDtoAssignment(assignment));
                }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return assignmentDto.get();
    }

    @Override
    public List<AssignmentDto> findAllByFromUser(Integer fromUserId) {
        return toDtoAssignmentList(this.assignmentRepository.findAllByFromUserId(fromUserId));
    }

    @Override
    public List<AssignmentDto> findAllByToUser(Integer toUserId) {
        return toDtoAssignmentList(this.assignmentRepository.findAllByToUserId(toUserId));
    }

    @Override
    public Page<AssignmentDto> paginationAssignmentFromUser(Integer fromUserId, int pageNo, int count) {
        List<Assignment> assignments = this.assignmentRepository.findAllByFromUserId(fromUserId);
        Pageable pageable = PageRequest.of(pageNo, count);
        return PageUtil.toPage(toDtoAssignmentList(assignments), pageable);
    }

    @Override
    public Page<AssignmentDto> paginationAssignmentToUser(Integer toUserId, int pageNo, int count) {
        List<Assignment> assignments = this.assignmentRepository.findAllByToUserId(toUserId);
        Pageable pageable = PageRequest.of(pageNo, count);
        return PageUtil.toPage(toDtoAssignmentList(assignments), pageable);
    }

    @Override
    public Page<AssignmentDto> findAllByStartDateBetween(Date startDate, Date endDate, int pageNo, Integer fromUserId) {
        List<Assignment> assignments = this.assignmentRepository.findAllByStartDateBetween(startDate, endDate, fromUserId);
        Pageable pageable = PageRequest.of(pageNo, 4);
        return PageUtil.toPage(toDtoAssignmentList(assignments), pageable);
    }

    @Override
    public Page<AssignmentDto> findAllSortedByIsOpen(int pageNo, Integer fromUserId) {
        List<Assignment> assignments =assignmentRepository.findAllSortedByIsOpen(fromUserId);
        Pageable pageable = PageRequest.of(pageNo, 3);
        return PageUtil.toPage(toDtoAssignmentList(assignments), pageable);
    }
}
