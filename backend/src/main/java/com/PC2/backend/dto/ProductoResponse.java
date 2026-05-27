package com.PC2.backend.dto;

import java.math.BigDecimal;

public record ProductoResponse(Long id, String nombre, String categoria, BigDecimal precio, Integer stock) {
}
