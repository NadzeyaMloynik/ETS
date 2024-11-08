package com.phegondev.usersmanagementsystem.payloads;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record UpdateAssignmentPayload(
        @NotNull
        @FutureOrPresent
        Date closeDate
) {
}
