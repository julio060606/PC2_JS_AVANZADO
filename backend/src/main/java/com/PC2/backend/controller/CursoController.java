package com.PC2.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.CursoResponse;
import com.PC2.backend.service.CursoService;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

	private final CursoService cursoService;

	public CursoController(CursoService cursoService) {
		this.cursoService = cursoService;
	}

	@GetMapping
	public List<CursoResponse> obtenerTodos() {
		return cursoService.obtenerTodos();
	}

	@GetMapping("/{id}")
	public CursoResponse obtenerPorId(@PathVariable Long id) {
		return cursoService.obtenerPorId(id);
	}
}
