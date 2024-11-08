package com.phegondev.usersmanagementsystem.payloads;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewAnswerPayload(
        //Todo
        @NotNull(message = "{question.create.errors.title_is_null}")
        @Size(max = 1000, message = "{question.create.errors.question_size_is_invalid}")
        String text,
        @NotNull
        Boolean isCorrect
) {
}
