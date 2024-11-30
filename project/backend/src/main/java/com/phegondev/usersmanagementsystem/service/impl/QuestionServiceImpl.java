package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.repository.QuestionRepository;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.service.QuestionService;
import com.phegondev.usersmanagementsystem.util.ImageUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.*;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;


    @Override
    public QuestionDto create(Long testId, String question, MultipartFile image) throws IOException {
        Test test = testRepository.findById(testId).orElse(null);
        Question q = questionRepository.save(new Question(null, question, test, null, null));
        if(image != null){
            q.setImage(ImageUtil.compressImage(image.getBytes()));
        }
        return toDtoQuestion(q);
    }

    @Override
    public void update(Long id, String question, MultipartFile image) {
        this.questionRepository.findById(id)
                .ifPresentOrElse(q -> {
                    q.setText(question);
                    if(image != null) {
                        try {
                            q.setImage(ImageUtil.compressImage(image.getBytes()));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    } else {
                        q.setImage(null);
                    }
                }, () -> {
                    throw new NoSuchElementException();
                });
    }

    @Override
    public void delete(Long id) {
        this.questionRepository.deleteById(id);
    }

    @Override
    public List<QuestionDto> findAll(Long testId) {
        return toDtoQuestionList(this.questionRepository.findAllByTestId(testId));
    }

    @Override
    public QuestionDto findById(Long id) {
        AtomicReference<QuestionDto> questionDto = new AtomicReference<>(new QuestionDto());
        this.questionRepository.findById(id).ifPresentOrElse( question -> {
            questionDto.set(toDtoQuestion(question));
        }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return questionDto.get();
    }

    @Override
    public Page<QuestionDto> paginationQuestions(Long testId, int pageNo, int count) {
        List<Question> questions = questionRepository.findAllByTestId(testId);
        Pageable pageable = PageRequest.of(pageNo, count);
        return PageUtil.toPage(toDtoQuestionList(questions), pageable);
    }

    @Override
    public byte[] getImage(Long id) {
        try{
            Optional<Question> questionOptional = questionRepository.findById(id);
            if (questionOptional.isPresent()) {
                Question question = questionOptional.get();
                return ImageUtil.decompressImage(question.getImage());
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
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            question.setImage(ImageUtil.compressImage(image.getBytes()));
            questionRepository.save(question);
        }
        else {
            throw new NoSuchElementException();
        }
    }
}
