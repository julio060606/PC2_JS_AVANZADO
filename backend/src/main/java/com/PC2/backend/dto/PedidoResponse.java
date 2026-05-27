package com.PC2.backend.dto;

import java.time.Instant;

public record PedidoResponse(Long id, String nombreEstudiante, ProductoResponse producto, Integer cantidad,
		String observacion, Instant fechaRegistro) {
}
