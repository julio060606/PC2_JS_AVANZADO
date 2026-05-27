package com.PC2.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.MatriculaRequest;
import com.PC2.backend.dto.MatriculaResponse;
import com.PC2.backend.entity.Curso;
import com.PC2.backend.entity.Matricula;
import com.PC2.backend.exception.BusinessRuleException;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.CursoRepository;
import com.PC2.backend.repository.MatriculaRepository;

@Service
public class MatriculaService {

	private final CursoRepository cursoRepository;
	private final MatriculaRepository matriculaRepository;
	private final CursoService cursoService;

	public MatriculaService(CursoRepository cursoRepository, MatriculaRepository matriculaRepository,
			CursoService cursoService) {
		this.cursoRepository = cursoRepository;
		this.matriculaRepository = matriculaRepository;
		this.cursoService = cursoService;
	}

	@Transactional
	public MatriculaResponse registrar(MatriculaRequest request) {
		Curso curso = cursoRepository.findByIdForMatricula(request.cursoId())
				.orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado: " + request.cursoId()));
		String codigoEstudiante = request.codigoEstudiante().trim().toUpperCase();
		if (curso.getVacantes() <= 0) {
			throw new BusinessRuleException("El curso no tiene vacantes disponibles.");
		}
		if (matriculaRepository.existsByCodigoEstudianteIgnoreCaseAndCursoId(codigoEstudiante, curso.getId())) {
			throw new BusinessRuleException("El estudiante ya solicito matricula en este curso.");
		}

		curso.setVacantes(curso.getVacantes() - 1);
		cursoRepository.save(curso);

		Matricula matricula = new Matricula();
		matricula.setNombreEstudiante(request.nombreEstudiante().trim());
		matricula.setCodigoEstudiante(codigoEstudiante);
		matricula.setCurso(curso);
		matricula.setTurno(request.turno());
		Matricula guardada = matriculaRepository.save(matricula);
		return new MatriculaResponse(guardada.getId(), guardada.getNombreEstudiante(),
				guardada.getCodigoEstudiante(), cursoService.toResponse(curso), guardada.getTurno(),
				guardada.getFechaRegistro());
	}
}
