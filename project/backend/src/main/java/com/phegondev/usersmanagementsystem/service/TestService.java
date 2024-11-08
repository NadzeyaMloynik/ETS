package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.TestDto;
import org.springframework.data.domain.Page;
import com.phegondev.usersmanagementsystem.entity.Test;

import java.util.Optional;

public interface TestService {

    Test create(String title, String description);

    TestDto findTest(Long id);

    void updateTest(Long id, String title, String description);

    void deleteTest(Long id);

    Page<TestDto> searchTests(int pageNo, String keyword);
}
