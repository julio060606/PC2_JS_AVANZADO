package com.PC2.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.ProductoResponse;
import com.PC2.backend.entity.Producto;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.ProductoRepository;

@Service
@Transactional(readOnly = true)
public class ProductoService {

	private final ProductoRepository productoRepository;

	public ProductoService(ProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}

	public List<ProductoResponse> obtenerTodos() {
		return productoRepository.findAll().stream().map(this::toResponse).toList();
	}

	public ProductoResponse obtenerPorId(Long id) {
		return productoRepository.findById(id)
				.map(this::toResponse)
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
	}

	public ProductoResponse toResponse(Producto producto) {
		return new ProductoResponse(producto.getId(), producto.getNombre(), producto.getCategoria(),
				producto.getPrecio(), producto.getStock());
	}
}
