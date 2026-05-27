package com.PC2.backend.dto;

import java.time.LocalDate;

import com.PC2.backend.entity.EstadoTarea;
import com.PC2.backend.entity.PrioridadTarea;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TareaRequest(
		@NotBlank @Size(max = 150) String titulo,
		@NotBlank @Size(max = 120) String curso,
		@Size(max = 500) String descripcion,
		@NotNull LocalDate fechaEntrega,
		@NotNull EstadoTarea estado,
		@NotNull PrioridadTarea prioridad) {
}
