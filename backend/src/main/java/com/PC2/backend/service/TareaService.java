package com.PC2.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.TareaRequest;
import com.PC2.backend.dto.TareaResponse;
import com.PC2.backend.entity.Tarea;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.TareaRepository;

@Service
@Transactional(readOnly = true)
public class TareaService {

	private final TareaRepository tareaRepository;

	public TareaService(TareaRepository tareaRepository) {
		this.tareaRepository = tareaRepository;
	}

	public List<TareaResponse> obtenerTodas() {
		return tareaRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Transactional
	public TareaResponse crear(TareaRequest request) {
		Tarea tarea = new Tarea();
		actualizarCampos(tarea, request);
		return toResponse(tareaRepository.save(tarea));
	}

	@Transactional
	public TareaResponse actualizar(Long id, TareaRequest request) {
		Tarea tarea = tareaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada: " + id));
		actualizarCampos(tarea, request);
		return toResponse(tareaRepository.save(tarea));
	}

	@Transactional
	public void eliminar(Long id) {
		Tarea tarea = tareaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada: " + id));
		tareaRepository.delete(tarea);
	}

	private void actualizarCampos(Tarea tarea, TareaRequest request) {
		tarea.setTitulo(request.titulo().trim());
		tarea.setCurso(request.curso().trim());
		tarea.setDescripcion(request.descripcion() == null || request.descripcion().isBlank() ? null
				: request.descripcion().trim());
		tarea.setFechaEntrega(request.fechaEntrega());
		tarea.setEstado(request.estado());
		tarea.setPrioridad(request.prioridad());
	}

	private TareaResponse toResponse(Tarea tarea) {
		return new TareaResponse(tarea.getId(), tarea.getTitulo(), tarea.getCurso(), tarea.getDescripcion(),
				tarea.getFechaEntrega(), tarea.getEstado(), tarea.getPrioridad());
	}
}
