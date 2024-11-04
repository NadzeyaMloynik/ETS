package com.phegondev.usersmanagementsystem.dto;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;


public record NewTestPayload(
        @NotNull(message = "{test.create.errors.title_is_null}")
        @Size(min = 3, max = 50, message = "{test.create.errors.title_size_is_invalid}")
        String title,
        @Size(max = 1000, message = "{test.create.errors.details_size_is_invalid}")
        String description
) {
}
