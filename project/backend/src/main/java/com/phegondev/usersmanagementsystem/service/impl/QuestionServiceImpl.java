package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.repository.QuestionRepository;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.service.QuestionService;
import com.phegondev.usersmanagementsystem.util.PageHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final TestRepository testRepository;


    @Override
    public QuestionDto create(Long testId, String question) {
        Test test = testRepository.findById(testId).orElse(null);
        Question q = questionRepository.save(new Question(null, question, test, null));
        return this.toDto(q);
    }

    @Override
    public void update(Long id, String question) {
        this.questionRepository.findById(id)
                .ifPresentOrElse(q -> {
                    q.setText(question);
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
        return this.toDtoList(this.questionRepository.findAllByTestId(testId));
    }

    @Override
    public QuestionDto findById(Long id) {
        QuestionDto questionDto = new QuestionDto();
        this.questionRepository.findById(id).ifPresentOrElse( question -> {
            questionDto.setId(question.getId());
            questionDto.setTestId(question.getTest().getId());
            questionDto.setQuestion(question.getText());
            questionDto.setAnswers(question.getAnswers());
        }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return questionDto;
    }

    @Override
    public Page<QuestionDto> paginationQuestions(Long testId, int pageNo) {
        List<Question> questions = questionRepository.findAllByTestId(testId);
        Pageable pageable = PageRequest.of(pageNo, 10);
        return PageHelper.toPage(questions, pageable);
    }

    private List<QuestionDto> toDtoList(List<Question> questions) {
        List<QuestionDto> questionDtos = new ArrayList<>();
        for(Question question : questions) {
            QuestionDto questionDto = new QuestionDto();
            questionDto.setId(question.getId());
            questionDto.setQuestion(question.getText());
            questionDto.setTestId(question.getTest().getId());
            questionDto.setAnswers(question.getAnswers());
            questionDtos.add(questionDto);
        }
        return questionDtos;
    }

    private QuestionDto toDto(Question question) {
        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setQuestion(question.getText());
        questionDto.setTestId(question.getTest().getId());
        questionDto.setAnswers(question.getAnswers());
        return questionDto;
    }

}
