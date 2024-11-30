package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.QuestionDto;
import com.phegondev.usersmanagementsystem.dto.TestDto;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.service.TestService;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import com.phegondev.usersmanagementsystem.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static com.phegondev.usersmanagementsystem.util.DtoUtil.*;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;

    @Override
    public Test create(String title, String description) {
        return testRepository.save(new Test(null, title, description, null));
    }

    @Override
    public TestDto findTest(Long id) {
        AtomicReference<TestDto> testDto = new AtomicReference<>(new TestDto());
        this.testRepository.findById(id).ifPresentOrElse( t -> {
                    testDto.set(toDtoTest(t));
                }, () -> {
                    throw new NoSuchElementException();
                }
        );
        return testDto.get();
    }

    @Override
    public TestDto updateTest(Long id, String title, String description) {
        Optional<Test> test = this.testRepository.findById(id);
        if(test.isPresent()) {
            test.get().setName(title);
            test.get().setDescription(description);
        }
        return DtoUtil.toDtoTest(this.testRepository.save(test.get()));
    }

    @Override
    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }

    @Override
    public Page<TestDto> searchTests(int pageNo, String keyword) {
        List<Test> tests = testRepository.searchByNameOrDescription(keyword);
        Pageable pageable = PageRequest.of(pageNo, 6);
        return PageUtil.toPage(toDtoTestList(tests), pageable);
    }

}
