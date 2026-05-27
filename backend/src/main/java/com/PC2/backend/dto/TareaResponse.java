package com.PC2.backend.dto;

import java.time.LocalDate;

import com.PC2.backend.entity.EstadoTarea;
import com.PC2.backend.entity.PrioridadTarea;

public record TareaResponse(Long id, String titulo, String curso, String descripcion, LocalDate fechaEntrega,
		EstadoTarea estado, PrioridadTarea prioridad) {
}
