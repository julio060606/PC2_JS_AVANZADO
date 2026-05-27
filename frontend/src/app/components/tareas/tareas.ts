import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit {
  readonly tareas = signal<Tarea[]>([]);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly cargando = signal(false);

  constructor(private readonly tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.tareaService.getTareas().subscribe({
      next: (datos) => {
        this.tareas.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.cargando.set(false);
      },
    });
  }

  eliminar(tarea: Tarea): void {
    if (tarea.id === undefined) {
      return;
    }
    this.tareaService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        this.mensaje.set('Tarea eliminada correctamente.');
        this.cargar();
      },
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  vencida(tarea: Tarea): boolean {
    return tarea.estado !== 'COMPLETADA' && new Date(`${tarea.fechaEntrega}T23:59:59`) < new Date();
  }

  urgente(tarea: Tarea): boolean {
    return tarea.estado !== 'COMPLETADA' && tarea.prioridad === 'ALTA';
  }

  etiqueta(valor: string): string {
    return valor === 'EN_PROCESO' ? 'En proceso' : valor.charAt(0) + valor.slice(1).toLowerCase();
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
