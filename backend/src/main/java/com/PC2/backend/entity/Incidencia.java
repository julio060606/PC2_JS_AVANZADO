package com.PC2.backend.entity;

import java.time.Instant;

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
@Table(name = "incidencias")
public class Incidencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre_reportante", nullable = false, length = 120)
	private String nombreReportante;

	@Enumerated(EnumType.STRING)
	@Column(name = "rol_reportante", nullable = false, length = 20)
	private RolReportante rolReportante;

	@Column(nullable = false, length = 40)
	private String aula;

	@Column(nullable = false, length = 60)
	private String equipo;

	@Column(nullable = false, length = 80)
	private String tipo;

	@Column(nullable = false, length = 500)
	private String descripcion;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 30)
	private EstadoIncidencia estado = EstadoIncidencia.PENDIENTE;

	@Column(name = "fecha_registro", nullable = false, updatable = false)
	private Instant fechaRegistro = Instant.now();
}
