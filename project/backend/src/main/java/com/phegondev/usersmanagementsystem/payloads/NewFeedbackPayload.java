package com.phegondev.usersmanagementsystem.payloads;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewFeedbackPayload(
        @NotNull
        @Size(max = 1000)
        String message
) {
}
