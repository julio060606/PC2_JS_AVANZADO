export type EstadoTarea = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA';
export type PrioridadTarea = 'BAJA' | 'MEDIA' | 'ALTA';

export interface Tarea {
  id?: number;
  titulo: string;
  curso: string;
  descripcion: string;
  fechaEntrega: string;
  estado: EstadoTarea;
  prioridad: PrioridadTarea;
}
