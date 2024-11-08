package com.phegondev.usersmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignment_id")
    private Long id;
    private Date startDate;
    private Date closeDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_user_id", referencedColumnName = "id")
    private Users toUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_user_id", referencedColumnName = "id")
    private Users fromUser;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "assignment")
    private List<AssignmentDetail> assignmentDetailList;
}
