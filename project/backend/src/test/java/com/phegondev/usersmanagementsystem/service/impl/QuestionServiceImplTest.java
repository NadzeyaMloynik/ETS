package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.payloads.NewQuestionPayload;
import com.phegondev.usersmanagementsystem.repository.QuestionRepository;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class QuestionServiceImplTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private TestRepository testRepository;

    @InjectMocks
    private QuestionServiceImpl questionService;

    @Mock
    private MultipartFile image;

    private Test test;
    private Question question;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        test = new Test();
        test.setId(1L);

        question = new Question();
        question.setId(1L);
        question.setText("Sample Question");
        question.setTest(test);
    }

    @org.junit.Test
    public void create_ShouldCreateQuestion() throws IOException {
        NewQuestionPayload payload = new NewQuestionPayload("Sample Question");

        when(testRepository.findById(1L)).thenReturn(Optional.of(test));
        when(questionRepository.save(any(Question.class))).thenReturn(question);
        when(image.getBytes()).thenReturn("Sample Image Bytes".getBytes());

        QuestionDto result = questionService.create(1L, payload.question(), image);

        assertNotNull(result);
        assertEquals("Sample Question", result.getQuestion());
        verify(questionRepository, times(1)).save(any(Question.class));
    }

    @org.junit.Test
    public void update_ShouldUpdateQuestion() throws IOException {
        NewQuestionPayload payload = new NewQuestionPayload("Updated Question");

        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(image.getBytes()).thenReturn("Updated Image Bytes".getBytes());

        questionService.update(1L, payload.question(), image);

        assertEquals("Updated Question", question.getText());
        verify(questionRepository, times(1)).findById(1L);
    }

    @org.junit.Test(expected = NoSuchElementException.class)
    public void update_ShouldThrowException_WhenQuestionNotFound() {
        NewQuestionPayload payload = new NewQuestionPayload("Updated Question");

        when(questionRepository.findById(1L)).thenReturn(Optional.empty());

        questionService.update(1L, payload.question(), image);
    }

    @org.junit.Test
    public void delete_ShouldDeleteQuestion() {
        doNothing().when(questionRepository).deleteById(1L);

        questionService.delete(1L);

        verify(questionRepository, times(1)).deleteById(1L);
    }

    @org.junit.Test
    public void findById_ShouldReturnQuestion() {
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));

        QuestionDto result = questionService.findById(1L);

        assertNotNull(result);
        assertEquals("Sample Question", result.getQuestion());
        verify(questionRepository, times(1)).findById(1L);
    }

    @org.junit.Test(expected = NoSuchElementException.class)
    public void findById_ShouldThrowException_WhenQuestionNotFound() {
        when(questionRepository.findById(1L)).thenReturn(Optional.empty());

        questionService.findById(1L);
    }

    @org.junit.Test
    public void findAll_ShouldReturnQuestions() {
        when(questionRepository.findAllByTestId(1L)).thenReturn(List.of(question));

        List<QuestionDto> result = questionService.findAll(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(questionRepository, times(1)).findAllByTestId(1L);
    }

    @org.junit.Test
    public void paginationQuestions_ShouldReturnPaginatedQuestions() {
        List<Question> questions = List.of(question);
        Pageable pageable = PageRequest.of(0, 5);
        when(questionRepository.findAllByTestId(1L)).thenReturn(questions);

        Page<QuestionDto> result = questionService.paginationQuestions(1L, 0, 5);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(questionRepository, times(1)).findAllByTestId(1L);
    }

    @org.junit.Test(expected = NoSuchElementException.class)
    public void getImage_ShouldThrowException_WhenQuestionNotFound() {
        when(questionRepository.findById(1L)).thenReturn(Optional.empty());

        questionService.getImage(1L);
    }

    @org.junit.Test
    public void uploadImage_ShouldSaveImage() throws IOException {
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(image.getBytes()).thenReturn("New Image Bytes".getBytes());

        questionService.uploadImage(1L, image);

        verify(questionRepository, times(1)).save(question);
    }

    @org.junit.Test(expected = NoSuchElementException.class)
    public void uploadImage_ShouldThrowException_WhenQuestionNotFound() throws IOException {
        when(questionRepository.findById(1L)).thenReturn(Optional.empty());

        questionService.uploadImage(1L, image);
    }
}
