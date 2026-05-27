export type EstadoIncidencia = 'PENDIENTE' | 'EN_PROCESO' | 'ATENDIDA';
export type RolReportante = 'ESTUDIANTE' | 'DOCENTE';

export interface Incidencia {
  id: number;
  nombreReportante: string;
  rolReportante: RolReportante;
  aula: string;
  equipo: string;
  tipo: string;
  descripcion: string;
  estado: EstadoIncidencia;
  fechaRegistro: string;
}

export type IncidenciaRequest = Omit<Incidencia, 'id' | 'estado' | 'fechaRegistro'>;
