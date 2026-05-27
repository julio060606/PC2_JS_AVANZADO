package com.PC2.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PC2.backend.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
