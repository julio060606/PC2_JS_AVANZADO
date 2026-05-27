package com.PC2.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.MatriculaRequest;
import com.PC2.backend.dto.MatriculaResponse;
import com.PC2.backend.service.MatriculaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/matriculas")
public class MatriculaController {

	private final MatriculaService matriculaService;

	public MatriculaController(MatriculaService matriculaService) {
		this.matriculaService = matriculaService;
	}

	@PostMapping
	public ResponseEntity<MatriculaResponse> registrar(@Valid @RequestBody MatriculaRequest request) {
		MatriculaResponse matricula = matriculaService.registrar(request);
		return ResponseEntity.created(URI.create("/api/matriculas/" + matricula.id())).body(matricula);
	}
}
