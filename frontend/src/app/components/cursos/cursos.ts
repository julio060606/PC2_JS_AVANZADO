import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {
  readonly cursos = signal<Curso[]>([]);
  readonly error = signal('');
  readonly cargando = signal(false);

  constructor(private readonly cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.cursoService.getCursos().subscribe({
      next: (datos) => {
        this.cursos.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set((response.error as ApiError)?.message ?? 'No se pudo cargar los cursos.');
        this.cargando.set(false);
      },
    });
  }
}
