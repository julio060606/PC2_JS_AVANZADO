package com.PC2.backend.repository;

import java.util.Optional;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.PC2.backend.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select c from Curso c where c.id = :id")
	Optional<Curso> findByIdForMatricula(@Param("id") Long id);
}
