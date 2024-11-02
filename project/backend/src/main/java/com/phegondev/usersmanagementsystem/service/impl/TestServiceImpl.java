package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.service.TestService;
import com.phegondev.usersmanagementsystem.util.PageHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

import static com.phegondev.usersmanagementsystem.util.PageHelper.toPage;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;

    @Override
    public Test create(String title, String description) {
        return testRepository.save(new Test(null, title, description, null));
    }

    @Override
    public Optional<Test> findTest(Long id) {
        return testRepository.findById(id);
    }

    @Override
    public void updateTest(Long id, String title, String description) {
        Test test = testRepository.getReferenceById(id);
        test.setName(title);
        test.setDescription(description);
        testRepository.save(test);
    }

    @Override
    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }

    @Override
    public Page<Test> searchTests(int pageNo, String keyword) {
        List<Test> tests = testRepository.searchByNameOrDescription(keyword);
        Pageable pageable = PageRequest.of(pageNo, 5);
        return PageHelper.toPage(tests, pageable);
    }

}
