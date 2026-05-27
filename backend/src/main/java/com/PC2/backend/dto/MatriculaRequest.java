package com.PC2.backend.dto;

import com.PC2.backend.entity.Turno;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MatriculaRequest(
		@NotBlank @Size(max = 120) String nombreEstudiante,
		@NotBlank @Size(max = 30) String codigoEstudiante,
		@NotNull Long cursoId,
		@NotNull Turno turno) {
}
