package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface QuestionService {

    QuestionDto create(Long testId, String question, MultipartFile image) throws IOException;

    void update(Long id, String question, MultipartFile image);

    void delete(Long id);

    List<QuestionDto> findAll(Long testId);

    QuestionDto findById(Long id);

    Page<QuestionDto> paginationQuestions(Long testId, int pageNo, int count);

    byte[] getImage(Long id);

    void uploadImage(Long id, MultipartFile image) throws IOException;
}
