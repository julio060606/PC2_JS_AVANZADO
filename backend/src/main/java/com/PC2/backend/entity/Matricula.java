package com.PC2.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "matriculas", uniqueConstraints = {
		@UniqueConstraint(name = "uk_matriculas_estudiante_curso", columnNames = { "codigo_estudiante", "curso_id" })
})
public class Matricula {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre_estudiante", nullable = false, length = 120)
	private String nombreEstudiante;

	@Column(name = "codigo_estudiante", nullable = false, length = 30)
	private String codigoEstudiante;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "curso_id", nullable = false)
	private Curso curso;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private Turno turno;

	@Column(name = "fecha_registro", nullable = false, updatable = false)
	private Instant fechaRegistro = Instant.now();
}
