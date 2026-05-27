package com.PC2.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tareas")
public class Tarea {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 150)
	private String titulo;

	@Column(nullable = false, length = 120)
	private String curso;

	@Column(length = 500)
	private String descripcion;

	@Column(name = "fecha_entrega", nullable = false)
	private LocalDate fechaEntrega;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private EstadoTarea estado = EstadoTarea.PENDIENTE;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PrioridadTarea prioridad;
}
