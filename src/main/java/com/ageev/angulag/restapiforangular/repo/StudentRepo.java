package com.ageev.angulag.restapiforangular.repo;

import com.ageev.angulag.restapiforangular.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
