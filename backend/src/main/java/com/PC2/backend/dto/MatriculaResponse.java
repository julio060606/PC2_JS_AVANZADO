package com.PC2.backend.dto;

import java.time.Instant;

import com.PC2.backend.entity.Turno;

public record MatriculaResponse(Long id, String nombreEstudiante, String codigoEstudiante, CursoResponse curso,
		Turno turno, Instant fechaRegistro) {
}
