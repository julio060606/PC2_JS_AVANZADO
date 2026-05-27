export type Modalidad = 'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDA';
export type Turno = 'MANANA' | 'TARDE' | 'NOCHE';

export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  modalidad: Modalidad;
  vacantes: number;
}

export interface MatriculaRequest {
  nombreEstudiante: string;
  codigoEstudiante: string;
  cursoId: number | null;
  turno: Turno;
}

export interface Matricula {
  id: number;
  nombreEstudiante: string;
  codigoEstudiante: string;
  curso: Curso;
  turno: Turno;
  fechaRegistro: string;
}
