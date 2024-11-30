package com.phegondev.usersmanagementsystem.util;

import com.phegondev.usersmanagementsystem.entity.Assignment;
import com.phegondev.usersmanagementsystem.payloads.NewNotificationPayload;
import com.phegondev.usersmanagementsystem.repository.AssignmentRepository;
import com.phegondev.usersmanagementsystem.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Component
@AllArgsConstructor
public class AssignmentSchedule {

    private final AssignmentRepository assignmentRepository;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 50 11 * * ?")
    public void closeOpenAssignmentSchedule() {
        System.out.println("Scheduler is running...");
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        List<Assignment> allAssignments = assignmentRepository.findAll();
        for (Assignment assignment : allAssignments) {
            LocalDate startDate = assignment.getStartDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if(startDate.isEqual(today)) {
                assignment.setIsOpen(true);
                this.assignmentRepository.save(assignment);
                this.notificationService.create(assignment.getToUser().getId(),
                        new NewNotificationPayload("Открытие задания" ,
                                "Задание " + assignment.getName() + " открыто для выполнения."));
            }
            LocalDate closeDate = assignment.getCloseDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if(closeDate.isEqual(yesterday)) {
                assignment.setIsOpen(false);
                this.assignmentRepository.save(assignment);
                this.notificationService.create(assignment.getToUser().getId(),
                        new NewNotificationPayload("Закрытие задания" ,
                                "Задание: " + assignment.getName() + " закрыто для выполнения."));
            }
        }
    }
}
