package com.phegondev.usersmanagementsystem.util;

import com.phegondev.usersmanagementsystem.dto.*;
import com.phegondev.usersmanagementsystem.entity.*;
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
        questionDto.setImage(question.getImage());
        return questionDto;
    }

    public static AnswerDto toDtoAnswer(Answer answer) {
        AnswerDto answerDto = new AnswerDto();
        answerDto.setId(answer.getId());
        answerDto.setText(answer.getText());
        answerDto.setQuestionId(answer.getQuestion().getId());
        answerDto.setIsCorrect(answer.getIsCorrect());
        answerDto.setImage(answer.getImage());
        answerDto.setPoints(answer.getPoints());
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
        notificationDto.setIsRead(notification.getIsRead());
        notificationDto.setDate(notification.getDate());
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
        testDto.setName(test.getName());
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

    public static FeedbackDto toDtoFeedback(Feedback feedback) {
        if(feedback != null) {
            FeedbackDto feedbackDto = new FeedbackDto();
            feedbackDto.setId(feedback.getId());
            feedbackDto.setMessage(feedback.getMessage());
            return feedbackDto;
        }
        return null;
    }

    public static AssignmentDetailDto toDtoAssignmentDetail(AssignmentDetail assignmentDetail) {
        AssignmentDetailDto assigmentDetailDto = new AssignmentDetailDto();
        assigmentDetailDto.setId(assignmentDetail.getId());
        assigmentDetailDto.setIsPassed(assignmentDetail.getIsPassed());
        assigmentDetailDto.setFeedback(toDtoFeedback(assignmentDetail.getFeedback()));
        assigmentDetailDto.setTest(toDtoTest(assignmentDetail.getTest()));
        assigmentDetailDto.setResult(assignmentDetail.getResult());
        assigmentDetailDto.setMaxResult(assignmentDetail.getMaxResult());
        assigmentDetailDto.setTestAnswers(assignmentDetail.getTestAnswers());
        return assigmentDetailDto;
    }

    public static List<AssignmentDetailDto> toDtoAssignmentDetailList(List<AssignmentDetail> assignmentDetails) {
        List<AssignmentDetailDto> assigmentDetailDtos = new ArrayList<>();
        if(assignmentDetails != null) {
            for(AssignmentDetail assignmentDetail : assignmentDetails) {
                assigmentDetailDtos.add(toDtoAssignmentDetail(assignmentDetail));
            }
        }
        return assigmentDetailDtos;
    }

    public static UserDto toDtoUser(Users user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setCity(user.getCity());
        userDto.setPosition(user.getPosition());
        userDto.setLastname(user.getLastname());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setImage(user.getImageData());
        return userDto;
    }

    public static List<UserDto> toDtoUserList(List<Users> users) {
        List<UserDto> userDtos = new ArrayList<>();
        if(users != null) {
            for(Users user : users) {
                userDtos.add(toDtoUser(user));
            }
        }
        return userDtos;
    }

    public static AssignmentDto toDtoAssignment(Assignment assignment) {
        AssignmentDto assignmentDto = new AssignmentDto();
        assignmentDto.setId(assignment.getId());
        assignmentDto.setFromUser(toDtoUser(assignment.getFromUser()));
        assignmentDto.setToUser(toDtoUser(assignment.getToUser()));
        assignmentDto.setCloseDate(assignment.getCloseDate());
        assignmentDto.setStartDate(assignment.getStartDate());
        assignmentDto.setIsOpen(assignment.getIsOpen());
        assignmentDto.setName(assignment.getName());
        assignmentDto.setAssigmentDetails(toDtoAssignmentDetailList(assignment.getAssignmentDetailList()));
        return assignmentDto;
    }

    public static List<AssignmentDto> toDtoAssignmentList(List<Assignment> assignments) {
        List<AssignmentDto> assignmentDtos = new ArrayList<>();
        if(assignments != null) {
            for(Assignment assignment : assignments) {
                assignmentDtos.add(toDtoAssignment(assignment));
            }
        }
        return assignmentDtos;
    }
}
