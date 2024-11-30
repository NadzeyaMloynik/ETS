package com.phegondev.usersmanagementsystem.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CountAnswerResultPayload(
        @NotNull
        Integer answerId,
        @NotNull
        Boolean isCorrect,
        @NotNull
        @Min(value = 1)
        @Max(value = 10)
        Integer points
) {
}
