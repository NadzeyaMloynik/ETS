package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.FeedbackDto;
import com.phegondev.usersmanagementsystem.payloads.NewFeedbackPayload;
import org.springframework.data.domain.Page;

public interface FeedbackService {

    FeedbackDto create (Long assignmentDetailId, NewFeedbackPayload payload);

    void update (Long id, NewFeedbackPayload payload);

    FeedbackDto getFeedback (Long assignmentDetailId);
}
