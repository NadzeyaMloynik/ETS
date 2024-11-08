package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.entity.Answer;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.repository.AnswerRepository;
import com.phegondev.usersmanagementsystem.repository.QuestionRepository;
import com.phegondev.usersmanagementsystem.service.AnswerService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    @Override
    public AnswerDto create(Long questionId, String text, Boolean isCorrect) {
        Optional<Question> question = this.questionRepository.findById(questionId);
        if (question.isPresent()) {
            Answer answer = answerRepository.save(new Answer(null, text, isCorrect,question.get(), null));
            return DtoUtil.toDtoAnswer(answer);
        }
        else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void update(Long id, String text, Boolean isCorrect) {
        this.answerRepository.findById(id)
                .ifPresentOrElse(a -> {
                    a.setText(text);
                    a.setIsCorrect(isCorrect);
                }, () -> {
                    throw new NoSuchElementException();
                });
    }

    @Override
    public void delete(Long id) {
        this.answerRepository.findById(id);
    }

    @Override
    public List<AnswerDto> findAll(Long questionId) {
        return DtoUtil.toDtoAnswerList(this.answerRepository.findAllByQuestionId(questionId));
    }

    @Override
    public AnswerDto findById(Long id) {
        AtomicReference<AnswerDto> answerDto = new AtomicReference<>(new AnswerDto());
        this.answerRepository.findById(id).ifPresentOrElse( answer -> {
            answerDto.set(DtoUtil.toDtoAnswer(answer));
                }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return answerDto.get();
    }

    @Override
    public byte[] getImage(Long id) {
        try{
            Optional<Answer> answerOptional = answerRepository.findById(id);
            if (answerOptional.isPresent()) {
                Answer answer = answerOptional.get();
                return ImageUtil.decompressImage(answer.getImage());
            }
            else {
                throw new NoSuchElementException();
            }
        } catch (Exception e) {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void uploadImage(Long id, MultipartFile image) throws IOException {
        Optional<Answer> answerOptional = answerRepository.findById(id);
        if (answerOptional.isPresent()) {
            Answer answer = answerOptional.get();
            answer.setImage(ImageUtil.compressImage(image.getBytes()));
            answerRepository.save(answer);
        }
        else {
            throw new NoSuchElementException();
        }
    }


}
