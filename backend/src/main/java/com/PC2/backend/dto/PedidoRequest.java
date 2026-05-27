package com.PC2.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PedidoRequest(
		@NotBlank @Size(max = 120) String nombreEstudiante,
		@NotNull Long productoId,
		@NotNull @Min(1) Integer cantidad,
		@Size(max = 300) String observacion) {
}
