package com.phegondev.usersmanagementsystem.dto;

import com.phegondev.usersmanagementsystem.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {
    private Long id;
    private String question;
    private Long testId;
    private List<Answer> answers;
}
