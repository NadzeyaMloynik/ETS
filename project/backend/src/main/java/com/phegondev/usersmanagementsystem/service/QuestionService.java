package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface QuestionService {

    QuestionDto create(Long testId, String question);

    void update(Long id, String question);

    void delete(Long id);

    List<QuestionDto> findAll(Long testId);

    QuestionDto findById(Long id);

    Page<QuestionDto> paginationQuestions(Long testId, int pageNo);
}
