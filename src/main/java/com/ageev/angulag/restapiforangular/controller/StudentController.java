package com.ageev.angulag.restapiforangular.controller;

import com.ageev.angulag.restapiforangular.domain.Student;
import com.ageev.angulag.restapiforangular.repo.StudentRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
public class StudentController {
    private final StudentRepo studentRepo;

    public StudentController(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    @GetMapping
    public List<Student> list() {
        return studentRepo.findAll();
    }

    @GetMapping("{id}")
    public Student getOne(@PathVariable("id") Student student) {
        return student;
    }

    @PostMapping
    public Student create(@RequestBody Student student) {
        return studentRepo.save(student);
    }

    @PutMapping("{id}")
    public Student update(@PathVariable("id") Student studentFromDb,
                          @RequestBody Student student) {
        BeanUtils.copyProperties(student, studentFromDb, "id");
        return studentRepo.save(studentFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Student student) {
        studentRepo.delete(student);
    }
}
