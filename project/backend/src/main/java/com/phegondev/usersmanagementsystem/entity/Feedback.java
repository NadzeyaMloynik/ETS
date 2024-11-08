package com.phegondev.usersmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "feedbacks")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long id;
    private String message;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assignment_detail_id", referencedColumnName = "assignment_detail_id")
    private AssignmentDetail assignmentDetail;
}
