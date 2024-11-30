package com.phegondev.usersmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDetailDto {
    private Long id;
    private Integer result;
    private Boolean isPassed;
    private TestDto test;
    private Integer maxResult;
    private FeedbackDto feedback;
    private String testAnswers;
}
