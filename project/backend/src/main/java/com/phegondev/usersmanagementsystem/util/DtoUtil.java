package com.phegondev.usersmanagementsystem.util;

import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.dto.NotificationDto;
import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.dto.TestDto;
import com.phegondev.usersmanagementsystem.entity.Answer;
import com.phegondev.usersmanagementsystem.entity.Notification;
import com.phegondev.usersmanagementsystem.entity.Question;
import com.phegondev.usersmanagementsystem.entity.Test;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DtoUtil {

    public static List<QuestionDto> toDtoQuestionList(List<Question> questions) {
        List<QuestionDto> questionDtos = new ArrayList<>();
        if(questions != null) {
            for(Question question : questions) {
                questionDtos.add(toDtoQuestion(question));
            }
            return questionDtos;
        }
        else return null;
    }

    public static QuestionDto toDtoQuestion(Question question) {
        QuestionDto questionDto = new QuestionDto();
        questionDto.setId(question.getId());
        questionDto.setQuestion(question.getText());
        questionDto.setTestId(question.getTest().getId());
        questionDto.setAnswerList(toDtoAnswerList(question.getAnswers()));
        return questionDto;
    }

    public static AnswerDto toDtoAnswer(Answer answer) {
        AnswerDto answerDto = new AnswerDto();
        answerDto.setId(answer.getId());
        answerDto.setText(answer.getText());
        answerDto.setQuestionId(answer.getQuestion().getId());
        answerDto.setIsCorrect(answer.getIsCorrect());
        answerDto.setImage(answer.getImage());
        return answerDto;
    }

    public static List<AnswerDto> toDtoAnswerList(List<Answer> answers) {
        List<AnswerDto> answerDtos = new ArrayList<>();
        if(answers != null) {
            for(Answer answer : answers) {
                answerDtos.add(toDtoAnswer(answer));
            }
            return answerDtos;
        }
        return null;
    }

    public static NotificationDto toDtoNotification(Notification notification) {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(notification.getId());
        notificationDto.setTitle(notification.getTitle());
        notificationDto.setBody(notification.getBody());
        notificationDto.setAuthorFirstname(notification.getAuthorFirstname());
        notificationDto.setAuthorLastname(notification.getAuthorLastname());
        notificationDto.setIsRead(notification.getIsRead());
        return notificationDto;
    }

    public static List<NotificationDto> toDtoNotificationList(List<Notification> notifications) {
        List<NotificationDto> notificationDtos = new ArrayList<>();
        if(notifications != null) {
            for(Notification notification : notifications) {
                notificationDtos.add(toDtoNotification(notification));
            }
            return notificationDtos;
        }
        return null;
    }

    public static TestDto toDtoTest(Test test) {
        TestDto testDto = new TestDto();
        testDto.setId(test.getId());
        testDto.setName(testDto.getName());
        testDto.setDescription(test.getDescription());
        testDto.setQuestions(toDtoQuestionList(test.getQuestions()));
        return testDto;
    }

    public static List<TestDto> toDtoTestList(List<Test> tests) {
        List<TestDto> testDtos = new ArrayList<>();
        if(tests != null) {
            for(Test test : tests) {
                testDtos.add(toDtoTest(test));
            }
        }
        return testDtos;
    }
}
