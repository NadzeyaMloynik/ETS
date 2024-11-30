package com.phegondev.usersmanagementsystem.service;


import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.payloads.NewAnswerPayload;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AnswerService {
    AnswerDto create(Long questionId, NewAnswerPayload payload, MultipartFile image) throws IOException;

    void updateAnswer(Long id, NewAnswerPayload payload, MultipartFile image) throws IOException;

    void delete(Long id);

    List<AnswerDto> findAll(Long questionId);

    AnswerDto findById(Long id);

    byte[] getImage(Long id);

    void uploadImage(Long id, MultipartFile image) throws IOException;
}
