import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { EstadoTarea, PrioridadTarea, Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-nueva-tarea',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nueva-tarea.html',
  styleUrl: './nueva-tarea.css',
})
export class NuevaTarea implements OnInit {
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly edicionId = signal<number | undefined>(undefined);
  readonly estados: EstadoTarea[] = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA'];
  readonly prioridades: PrioridadTarea[] = ['BAJA', 'MEDIA', 'ALTA'];
  formulario: Tarea = this.formularioInicial();

  constructor(
    private readonly tareaService: TareaService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (!id) {
      return;
    }
    this.tareaService.getTareas().subscribe({
      next: (tareas) => {
        const tarea = tareas.find((item) => item.id === id);
        if (tarea) {
          this.edicionId.set(id);
          this.formulario = { ...tarea };
        } else {
          this.error.set('La tarea seleccionada no existe.');
        }
      },
      error: () => this.error.set('No se pudo cargar la tarea.'),
    });
  }

  guardar(): void {
    this.mensaje.set('');
    this.error.set('');
    const id = this.edicionId();
    const operacion = id === undefined
      ? this.tareaService.registrarTarea(this.formulario)
      : this.tareaService.actualizarTarea(id, this.formulario);
    operacion.subscribe({
      next: () => {
        this.mensaje.set(id === undefined ? 'Tarea registrada correctamente.' : 'Tarea actualizada correctamente.');
        if (id === undefined) {
          this.formulario = this.formularioInicial();
        }
      },
      error: (response: HttpErrorResponse) =>
        this.error.set((response.error as ApiError)?.message ?? 'No se pudo guardar la tarea.'),
    });
  }

  etiqueta(valor: string): string {
    return valor === 'EN_PROCESO' ? 'En proceso' : valor.charAt(0) + valor.slice(1).toLowerCase();
  }

  private formularioInicial(): Tarea {
    return {
      titulo: '',
      curso: '',
      descripcion: '',
      fechaEntrega: '',
      estado: 'PENDIENTE',
      prioridad: 'MEDIA',
    };
  }
}
