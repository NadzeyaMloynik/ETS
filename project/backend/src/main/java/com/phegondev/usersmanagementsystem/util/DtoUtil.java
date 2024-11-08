package com.phegondev.usersmanagementsystem.util;

import com.phegondev.usersmanagementsystem.dto.AnswerDto;
import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.entity.Answer;
import com.phegondev.usersmanagementsystem.entity.Question;
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

}
