package com.PC2.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.EstadoIncidenciaRequest;
import com.PC2.backend.dto.IncidenciaRequest;
import com.PC2.backend.dto.IncidenciaResponse;
import com.PC2.backend.entity.EstadoIncidencia;
import com.PC2.backend.entity.Incidencia;
import com.PC2.backend.exception.BusinessRuleException;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.IncidenciaRepository;

@Service
@Transactional(readOnly = true)
public class IncidenciaService {

	private final IncidenciaRepository incidenciaRepository;

	public IncidenciaService(IncidenciaRepository incidenciaRepository) {
		this.incidenciaRepository = incidenciaRepository;
	}

	public List<IncidenciaResponse> obtenerTodas() {
		return incidenciaRepository.findAll().stream().map(this::toResponse).toList();
	}

	@Transactional
	public IncidenciaResponse crear(IncidenciaRequest request) {
		Incidencia incidencia = new Incidencia();
		incidencia.setNombreReportante(request.nombreReportante().trim());
		incidencia.setRolReportante(request.rolReportante());
		incidencia.setAula(request.aula().trim());
		incidencia.setEquipo(request.equipo().trim());
		incidencia.setTipo(request.tipo().trim());
		incidencia.setDescripcion(request.descripcion().trim());
		return toResponse(incidenciaRepository.save(incidencia));
	}

	@Transactional
	public IncidenciaResponse cambiarEstado(Long id, EstadoIncidenciaRequest request) {
		Incidencia incidencia = incidenciaRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Incidencia no encontrada: " + id));
		if (request.estado() == EstadoIncidencia.PENDIENTE) {
			throw new BusinessRuleException("Una incidencia atendida o en proceso no puede volver a pendiente.");
		}
		if (incidencia.getEstado() == EstadoIncidencia.ATENDIDA) {
			throw new BusinessRuleException("La incidencia ya fue atendida.");
		}
		incidencia.setEstado(request.estado());
		return toResponse(incidenciaRepository.save(incidencia));
	}

	private IncidenciaResponse toResponse(Incidencia incidencia) {
		return new IncidenciaResponse(incidencia.getId(), incidencia.getNombreReportante(),
				incidencia.getRolReportante(), incidencia.getAula(), incidencia.getEquipo(), incidencia.getTipo(),
				incidencia.getDescripcion(), incidencia.getEstado(), incidencia.getFechaRegistro());
	}
}
