import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { IncidenciaRequest } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-nueva-incidencia',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nueva-incidencia.html',
  styleUrl: './nueva-incidencia.css',
})
export class NuevaIncidencia {
  readonly mensaje = signal('');
  readonly error = signal('');
  formulario: IncidenciaRequest = {
    nombreReportante: '',
    rolReportante: 'ESTUDIANTE',
    aula: '',
    equipo: '',
    tipo: '',
    descripcion: '',
  };

  constructor(private readonly incidenciaService: IncidenciaService) {}

  registrar(): void {
    this.mensaje.set('');
    this.error.set('');
    this.incidenciaService.registrarIncidencia(this.formulario).subscribe({
      next: () => {
        this.mensaje.set('Incidencia registrada correctamente.');
        this.formulario = {
          nombreReportante: '',
          rolReportante: 'ESTUDIANTE',
          aula: '',
          equipo: '',
          tipo: '',
          descripcion: '',
        };
      },
      error: (response: HttpErrorResponse) =>
        this.error.set((response.error as ApiError)?.message ?? 'No se pudo registrar la incidencia.'),
    });
  }
}
