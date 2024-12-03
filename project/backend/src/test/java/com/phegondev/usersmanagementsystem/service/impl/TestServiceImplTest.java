package com.phegondev.usersmanagementsystem.service.impl;

import com.phegondev.usersmanagementsystem.dto.TestDto;
import com.phegondev.usersmanagementsystem.entity.Test;
import com.phegondev.usersmanagementsystem.repository.TestRepository;
import com.phegondev.usersmanagementsystem.util.DtoUtil;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class TestServiceImplTest {

    @Mock
    private TestRepository testRepository;

    @InjectMocks
    private TestServiceImpl testService;

    private Test test;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        test = new Test();
        test.setId(1L);
        test.setName("Sample Test");
        test.setDescription("Sample Description");
    }

    @org.junit.Test
    public void create_ShouldCreateTest() {
        when(testRepository.save(any(Test.class))).thenReturn(test);

        Test result = testService.create("Sample Test", "Sample Description");

        assertNotNull(result);
        assertEquals("Sample Test", result.getName());
        assertEquals("Sample Description", result.getDescription());
        verify(testRepository, times(1)).save(any(Test.class));
    }

    @ org.junit.Test
    public void findTest_ShouldReturnTest() {
        when(testRepository.findById(1L)).thenReturn(Optional.of(test));

        TestDto result = testService.findTest(1L);

        assertNotNull(result);
        assertEquals("Sample Test", result.getName());
        verify(testRepository, times(1)).findById(1L);
    }

    @ org.junit.Test(expected = NoSuchElementException.class)
    public void findTest_ShouldThrowException_WhenTestNotFound() {
        when(testRepository.findById(1L)).thenReturn(Optional.empty());

        testService.findTest(1L);
    }

    @org.junit.Test
    public void updateTest_ShouldUpdateTest() {
        when(testRepository.findById(1L)).thenReturn(Optional.of(test));
        when(testRepository.save(any(Test.class))).thenReturn(test);

        TestDto result = testService.updateTest(1L, "Updated Test", "Updated Description");

        assertNotNull(result);
        assertEquals("Updated Test", result.getName());
        assertEquals("Updated Description", result.getDescription());
        verify(testRepository, times(1)).save(test);
    }

    @org.junit.Test(expected = NoSuchElementException.class)
    public void updateTest_ShouldThrowException_WhenTestNotFound() {
        when(testRepository.findById(1L)).thenReturn(Optional.empty());

        testService.updateTest(1L, "Updated Test", "Updated Description");
    }

    @org.junit.Test
    public void deleteTest_ShouldDeleteTest() {
        doNothing().when(testRepository).deleteById(1L);

        testService.deleteTest(1L);

        verify(testRepository, times(1)).deleteById(1L);
    }

    @org.junit.Test
    public void searchTests_ShouldReturnPagedTests() {
        List<Test> tests = List.of(test);
        when(testRepository.searchByNameOrDescription("Sample")).thenReturn(tests);

        Page<TestDto> result = testService.searchTests(0, "Sample");

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("Sample Test", result.getContent().get(0).getName());
        verify(testRepository, times(1)).searchByNameOrDescription("Sample");
    }
}
