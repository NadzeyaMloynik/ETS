package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.FeedbackDto;
import com.phegondev.usersmanagementsystem.entity.AssignmentDetail;
import com.phegondev.usersmanagementsystem.entity.Feedback;
import com.phegondev.usersmanagementsystem.payloads.NewFeedbackPayload;
import com.phegondev.usersmanagementsystem.repository.AssignmentDetailRepository;
import com.phegondev.usersmanagementsystem.repository.AssignmentRepository;
import com.phegondev.usersmanagementsystem.repository.FeedbackRepository;
import com.phegondev.usersmanagementsystem.service.FeedbackService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;

    private final AssignmentDetailRepository assignmentDetailRepository;

    @Override
    public FeedbackDto create(Long assignmentDetailId, NewFeedbackPayload payload) {
        Optional <AssignmentDetail> assignmentDetail = this.assignmentDetailRepository.findById(assignmentDetailId);
        if (assignmentDetail.isPresent()) {
            return DtoUtil.toDtoFeedback(this.feedbackRepository.save(new Feedback(null, payload.message(), assignmentDetail.get())));
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void update(Long id, NewFeedbackPayload payload) {
        Optional<Feedback> feedback = this.feedbackRepository.findById(id);
        if (feedback.isPresent()) {
            feedback.get().setMessage(payload.message());
            this.feedbackRepository.save(feedback.get());
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public FeedbackDto getFeedback(Long assignmentDetailId) {
        Optional<Feedback> feedback = this.feedbackRepository.findByAssignmentDetailId(assignmentDetailId);
        if (feedback.isPresent()) {
            return DtoUtil.toDtoFeedback(feedback.get());
        }
        throw new NoSuchElementException();
    }
}
