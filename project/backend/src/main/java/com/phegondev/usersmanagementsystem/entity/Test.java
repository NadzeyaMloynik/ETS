package com.phegondev.usersmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tests", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    private Long id;
    private String name;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "test", orphanRemoval = true)
    private List<Question> questions;
}
