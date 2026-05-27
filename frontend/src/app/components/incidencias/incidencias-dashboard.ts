import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-incidencias-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incidencias-dashboard.html',
  styleUrl: './incidencias-dashboard.css',
})
export class IncidenciasDashboard implements OnInit {
  readonly incidencias = signal<Incidencia[]>([]);
  readonly error = signal('');
  readonly total = computed(() => this.incidencias().length);
  readonly pendientes = computed(() => this.contar('PENDIENTE'));
  readonly enProceso = computed(() => this.contar('EN_PROCESO'));
  readonly atendidas = computed(() => this.contar('ATENDIDA'));

  constructor(private readonly incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.incidenciaService.getIncidencias().subscribe({
      next: (incidencias) => this.incidencias.set(incidencias),
      error: () => this.error.set('No se pudieron cargar las incidencias.'),
    });
  }

  private contar(estado: Incidencia['estado']): number {
    return this.incidencias().filter((incidencia) => incidencia.estado === estado).length;
  }
}
