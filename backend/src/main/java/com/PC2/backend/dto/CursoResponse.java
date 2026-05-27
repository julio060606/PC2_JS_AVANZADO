package com.PC2.backend.dto;

import com.PC2.backend.entity.ModalidadCurso;

public record CursoResponse(Long id, String codigo, String nombre, Integer creditos, ModalidadCurso modalidad,
		Integer vacantes) {
}
