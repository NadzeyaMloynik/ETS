package com.phegondev.usersmanagementsystem.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record AssignmentDetailPayload(
        @NotNull
        @Positive
        Float result
) {
}
