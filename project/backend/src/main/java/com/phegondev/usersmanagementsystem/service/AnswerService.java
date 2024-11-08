package com.phegondev.usersmanagementsystem.service;


import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AnswerService {
    AnswerDto create(Long questionId, String text, Boolean isCorrect);

    void update(Long id, String text, Boolean isCorrect);

    void delete(Long id);

    List<AnswerDto> findAll(Long questionId);

    AnswerDto findById(Long id);

    public byte[] getImage(Long id);

    public void uploadImage(Long id, MultipartFile image) throws IOException;
}
