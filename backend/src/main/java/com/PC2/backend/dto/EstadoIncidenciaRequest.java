package com.PC2.backend.dto;

import com.PC2.backend.entity.EstadoIncidencia;

import jakarta.validation.constraints.NotNull;

public record EstadoIncidenciaRequest(@NotNull EstadoIncidencia estado) {
}
