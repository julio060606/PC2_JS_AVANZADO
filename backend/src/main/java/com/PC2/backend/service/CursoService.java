package com.PC2.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.CursoResponse;
import com.PC2.backend.entity.Curso;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.CursoRepository;

@Service
@Transactional(readOnly = true)
public class CursoService {

	private final CursoRepository cursoRepository;

	public CursoService(CursoRepository cursoRepository) {
		this.cursoRepository = cursoRepository;
	}

	public List<CursoResponse> obtenerTodos() {
		return cursoRepository.findAll().stream().map(this::toResponse).toList();
	}

	public CursoResponse obtenerPorId(Long id) {
		return cursoRepository.findById(id).map(this::toResponse)
				.orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado: " + id));
	}

	public CursoResponse toResponse(Curso curso) {
		return new CursoResponse(curso.getId(), curso.getCodigo(), curso.getNombre(), curso.getCreditos(),
				curso.getModalidad(), curso.getVacantes());
	}
}
