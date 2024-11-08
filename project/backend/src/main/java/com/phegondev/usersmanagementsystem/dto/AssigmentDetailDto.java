package com.phegondev.usersmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssigmentDetailDto {
    private Long id;
    private Float result;
    private Boolean isPassed;
    private TestDto test;
    private FeedbackDto feedback;
}
