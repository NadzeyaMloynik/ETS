package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.entity.Test;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    QuestionDto create(Long testId, String question);

    void update(Long id, String question);

    void delete(Long id);

    List<QuestionDto> findAll(Long testId);

    QuestionDto findById(Long id);

    Page<QuestionDto> paginationQuestions(Long testId, int pageNo);
}
