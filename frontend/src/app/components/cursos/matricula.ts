import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { Curso, Matricula, MatriculaRequest, Turno } from '../../models/curso';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css',
})
export class MatriculaComponent implements OnInit {
  readonly cursos = signal<Curso[]>([]);
  readonly confirmacion = signal<Matricula | undefined>(undefined);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly turnos: Turno[] = ['MANANA', 'TARDE', 'NOCHE'];
  solicitud: MatriculaRequest = {
    nombreEstudiante: '',
    codigoEstudiante: '',
    cursoId: null,
    turno: 'MANANA',
  };

  constructor(
    private readonly cursoService: CursoService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const cursoId = Number(this.route.snapshot.queryParamMap.get('cursoId'));
    if (cursoId) {
      this.solicitud.cursoId = cursoId;
    }
    this.cargarCursos();
  }

  get cursoSeleccionado(): Curso | undefined {
    return this.cursos().find((curso) => curso.id === this.solicitud.cursoId);
  }

  enviar(): void {
    this.mensaje.set('');
    this.error.set('');
    this.cursoService.matricular(this.solicitud).subscribe({
      next: (matricula) => {
        this.confirmacion.set(matricula);
        this.mensaje.set('Solicitud de matricula registrada correctamente.');
        this.cargarCursos();
      },
      error: (response: HttpErrorResponse) =>
        this.error.set((response.error as ApiError)?.message ?? 'No se pudo registrar la matricula.'),
    });
  }

  etiquetaTurno(turno: Turno): string {
    return turno === 'MANANA' ? 'Manana' : turno.charAt(0) + turno.slice(1).toLowerCase();
  }

  private cargarCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: (cursos) => this.cursos.set(cursos),
      error: () => this.error.set('No se pudieron cargar los cursos.'),
    });
  }
}
