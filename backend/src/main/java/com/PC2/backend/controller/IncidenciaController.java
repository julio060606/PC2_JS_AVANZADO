package com.PC2.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.EstadoIncidenciaRequest;
import com.PC2.backend.dto.IncidenciaRequest;
import com.PC2.backend.dto.IncidenciaResponse;
import com.PC2.backend.service.IncidenciaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

	private final IncidenciaService incidenciaService;

	public IncidenciaController(IncidenciaService incidenciaService) {
		this.incidenciaService = incidenciaService;
	}

	@GetMapping
	public List<IncidenciaResponse> obtenerTodas() {
		return incidenciaService.obtenerTodas();
	}

	@PostMapping
	public ResponseEntity<IncidenciaResponse> crear(@Valid @RequestBody IncidenciaRequest request) {
		IncidenciaResponse incidencia = incidenciaService.crear(request);
		return ResponseEntity.created(URI.create("/api/incidencias/" + incidencia.id())).body(incidencia);
	}

	@PutMapping("/{id}/estado")
	public IncidenciaResponse cambiarEstado(@PathVariable Long id,
			@Valid @RequestBody EstadoIncidenciaRequest request) {
		return incidenciaService.cambiarEstado(id, request);
	}
}
