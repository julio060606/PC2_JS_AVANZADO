package com.PC2.backend.dto;

import java.time.Instant;

import com.PC2.backend.entity.EstadoIncidencia;
import com.PC2.backend.entity.RolReportante;

public record IncidenciaResponse(Long id, String nombreReportante, RolReportante rolReportante, String aula,
		String equipo, String tipo, String descripcion, EstadoIncidencia estado, Instant fechaRegistro) {
}
