import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { EstadoIncidencia, Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class Incidencias implements OnInit {
  readonly incidencias = signal<Incidencia[]>([]);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);

  constructor(private readonly incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.incidenciaService.getIncidencias().subscribe({
      next: (datos) => {
        this.incidencias.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  avanzarEstado(incidencia: Incidencia): void {
    const estado = this.siguienteEstado(incidencia.estado);
    if (!estado) {
      return;
    }
    this.mensaje.set('');
    this.error.set('');
    this.incidenciaService.cambiarEstado(incidencia.id, estado).subscribe({
      next: () => {
        this.mensaje.set('Estado actualizado correctamente.');
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  etiquetaEstado(estado: EstadoIncidencia): string {
    return estado === 'EN_PROCESO' ? 'En proceso' : estado.charAt(0) + estado.slice(1).toLowerCase();
  }

  private siguienteEstado(estado: EstadoIncidencia): EstadoIncidencia | undefined {
    if (estado === 'PENDIENTE') {
      return 'EN_PROCESO';
    }
    return estado === 'EN_PROCESO' ? 'ATENDIDA' : undefined;
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
