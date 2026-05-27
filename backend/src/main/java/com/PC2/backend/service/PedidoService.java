package com.PC2.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.PC2.backend.dto.PedidoRequest;
import com.PC2.backend.dto.PedidoResponse;
import com.PC2.backend.entity.Pedido;
import com.PC2.backend.entity.Producto;
import com.PC2.backend.exception.BusinessRuleException;
import com.PC2.backend.exception.ResourceNotFoundException;
import com.PC2.backend.repository.PedidoRepository;
import com.PC2.backend.repository.ProductoRepository;

@Service
public class PedidoService {

	private final PedidoRepository pedidoRepository;
	private final ProductoRepository productoRepository;
	private final ProductoService productoService;

	public PedidoService(PedidoRepository pedidoRepository, ProductoRepository productoRepository,
			ProductoService productoService) {
		this.pedidoRepository = pedidoRepository;
		this.productoRepository = productoRepository;
		this.productoService = productoService;
	}

	@Transactional
	public PedidoResponse registrar(PedidoRequest request) {
		Producto producto = productoRepository.findByIdForPedido(request.productoId())
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + request.productoId()));
		if (producto.getStock() < request.cantidad()) {
			throw new BusinessRuleException("No hay stock suficiente para registrar el pedido.");
		}

		producto.setStock(producto.getStock() - request.cantidad());
		productoRepository.save(producto);

		Pedido pedido = new Pedido();
		pedido.setNombreEstudiante(request.nombreEstudiante().trim());
		pedido.setProducto(producto);
		pedido.setCantidad(request.cantidad());
		pedido.setObservacion(normalizarOpcional(request.observacion()));
		return toResponse(pedidoRepository.save(pedido));
	}

	private PedidoResponse toResponse(Pedido pedido) {
		return new PedidoResponse(pedido.getId(), pedido.getNombreEstudiante(),
				productoService.toResponse(pedido.getProducto()), pedido.getCantidad(), pedido.getObservacion(),
				pedido.getFechaRegistro());
	}

	private String normalizarOpcional(String valor) {
		return valor == null || valor.isBlank() ? null : valor.trim();
	}
}
