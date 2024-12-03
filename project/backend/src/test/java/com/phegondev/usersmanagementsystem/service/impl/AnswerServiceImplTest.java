package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.entity.Answer;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.payloads.NewAnswerPayload;
import com.phegondev.usersmanagementsystem.repository.AnswerRepository;
import com.phegondev.usersmanagementsystem.repository.QuestionRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class AnswerServiceImplTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private AnswerServiceImpl answerService;

    @Mock
    private MultipartFile image;

    private Question question;
    private Answer answer;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        question = new Question();
        question.setId(1L);

        answer = new Answer();
        answer.setId(1L);
        answer.setText("Sample Answer");
        answer.setPoints(10);
        answer.setIsCorrect(true);
        answer.setQuestion(question);
    }

    @Test
    public void create_ShouldCreateAnswer() throws IOException {
        NewAnswerPayload payload = new NewAnswerPayload("Sample Answer", true, 10);

        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(answerRepository.save(any(Answer.class))).thenReturn(answer);
        when(image.getBytes()).thenReturn("Sample Image Bytes".getBytes());

        AnswerDto result = answerService.create(1L, payload, image);

        assertNotNull(result);
        assertEquals("Sample Answer", result.getText());
        verify(answerRepository, times(1)).save(any(Answer.class));
    }

    @Test
    public void updateAnswer_ShouldUpdateAnswer() throws IOException {
        NewAnswerPayload payload = new NewAnswerPayload("Updated Answer", false, 20);

        when(answerRepository.findById(1L)).thenReturn(Optional.of(answer));
        when(image.getBytes()).thenReturn("Updated Image Bytes".getBytes());

        answerService.updateAnswer(1L, payload, image);

        assertEquals(payload.text(), answer.getText());
        assertEquals(payload.points(), answer.getPoints());
        assertFalse(answer.getIsCorrect());
        verify(answerRepository, times(1)).findById(1L);
    }

    @Test
    public void delete_ShouldDeleteAnswer() {
        doNothing().when(answerRepository).deleteById(1L);

        answerService.delete(1L);

        verify(answerRepository, times(1)).deleteById(1L);
    }

    @Test
    public void findById_ShouldReturnAnswer() {
        when(answerRepository.findById(1L)).thenReturn(Optional.of(answer));

        AnswerDto result = answerService.findById(1L);

        assertNotNull(result);
        assertEquals("Sample Answer", result.getText());
        verify(answerRepository, times(1)).findById(1L);
    }

    @Test(expected = NoSuchElementException.class)
    public void findById_ShouldThrowException_WhenAnswerNotFound() {
        when(answerRepository.findById(1L)).thenReturn(Optional.empty());

        answerService.findById(1L);
    }

    @Test(expected = NoSuchElementException.class)
    public void getImage_ShouldThrowException_WhenAnswerNotFound() {
        when(answerRepository.findById(1L)).thenReturn(Optional.empty());

        answerService.getImage(1L);
    }

    @Test
    public void uploadImage_ShouldSaveImage() throws IOException {
        when(answerRepository.findById(1L)).thenReturn(Optional.of(answer));
        when(image.getBytes()).thenReturn("New Image Bytes".getBytes());

        answerService.uploadImage(1L, image);

        verify(answerRepository, times(1)).save(answer);
    }

    @Test(expected = NoSuchElementException.class)
    public void uploadImage_ShouldThrowException_WhenAnswerNotFound() throws IOException {
        when(answerRepository.findById(1L)).thenReturn(Optional.empty());

        answerService.uploadImage(1L, image);
    }
}
