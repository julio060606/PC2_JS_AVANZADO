package com.PC2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PC2.backend.entity.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {

	boolean existsByCodigoEstudianteIgnoreCaseAndCursoId(String codigoEstudiante, Long cursoId);
}
