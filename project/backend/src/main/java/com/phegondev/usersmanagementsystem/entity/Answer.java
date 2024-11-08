package com.phegondev.usersmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "answers", uniqueConstraints = @UniqueConstraint(columnNames = {"username", "image"}))
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long id;
    private String text;
    private Integer points;
    private Boolean isCorrect;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "question_id", referencedColumnName = "question_id")
    private Question question;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;
}
