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
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.toDtoAssignmentDetailList;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;

    private final AssignmentDetailRepository assignmentDetailRepository;

    @Override
    public FeedbackDto create(Long assignmentDetailId, NewFeedbackPayload payload) {
        Optional <AssignmentDetail> assignmentDetail = this.assignmentDetailRepository.findById(assignmentDetailId);
        if (assignmentDetail.isPresent()) {
            Feedback feedback = this.feedbackRepository.save(new Feedback(null, payload.message(), assignmentDetail.get()));
            assignmentDetail.get().setFeedback(feedback);
            this.assignmentDetailRepository.save(assignmentDetail.get());
            return DtoUtil.toDtoFeedback(feedback);
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

//    @Override
//    public Page<FeedbackDto> getAllFeedback(int pageNo, int pageSize) {
//        List<FeedbackDto> feedbacks = this.repository.findAllByAssignmentId(assigmentId);
//        Pageable pageable = PageRequest.of(pageNo, 10);
//        return PageUtil.toPage(toDtoAssignmentDetailList(feedbacks), pageable);
//    }
}
