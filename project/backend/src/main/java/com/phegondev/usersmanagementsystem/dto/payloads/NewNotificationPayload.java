package com.phegondev.usersmanagementsystem.dto.payloads;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewNotificationPayload (
    @NotNull
    @Size(max = 100)
    String title,
    @NotNull
    @Size(max = 30)
    String authorFirstname,
    @NotNull
    @Size(max = 40)
    String authorLastname,
    @NotNull
    @Size(max = 1000)
    String body){}
