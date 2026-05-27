package com.PC2.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.ProductoResponse;
import com.PC2.backend.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	private final ProductoService productoService;

	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}

	@GetMapping
	public List<ProductoResponse> obtenerTodos() {
		return productoService.obtenerTodos();
	}

	@GetMapping("/{id}")
	public ProductoResponse obtenerPorId(@PathVariable Long id) {
		return productoService.obtenerPorId(id);
	}
}
