package com.phegondev.usersmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDto {
    private Long id;
    private Date startDate;
    private Date closeDate;
    private UserDto toUser;
    private UserDto fromUser;
    private List<AssignmentDetailDto> assigmentDetails;
}

