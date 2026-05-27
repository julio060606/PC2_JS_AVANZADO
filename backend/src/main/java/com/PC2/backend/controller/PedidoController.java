package com.PC2.backend.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PC2.backend.dto.PedidoRequest;
import com.PC2.backend.dto.PedidoResponse;
import com.PC2.backend.service.PedidoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

	private final PedidoService pedidoService;

	public PedidoController(PedidoService pedidoService) {
		this.pedidoService = pedidoService;
	}

	@PostMapping
	public ResponseEntity<PedidoResponse> registrar(@Valid @RequestBody PedidoRequest request) {
		PedidoResponse pedido = pedidoService.registrar(request);
		return ResponseEntity.created(URI.create("/api/pedidos/" + pedido.id())).body(pedido);
	}
}
