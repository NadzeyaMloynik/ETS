package com.phegondev.usersmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
    private Long id;
    private String text;
    private Boolean isCorrect;
    private Long questionId;
    private Integer points;
    private byte[] image;
}
