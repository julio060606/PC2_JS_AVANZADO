package com.PC2.backend.dto;

import com.PC2.backend.entity.RolReportante;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IncidenciaRequest(
		@NotBlank @Size(max = 120) String nombreReportante,
		@NotNull RolReportante rolReportante,
		@NotBlank @Size(max = 40) String aula,
		@NotBlank @Size(max = 60) String equipo,
		@NotBlank @Size(max = 80) String tipo,
		@NotBlank @Size(max = 500) String descripcion) {
}
