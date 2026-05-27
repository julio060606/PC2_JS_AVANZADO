import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Curso, Matricula, MatriculaRequest } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly url = `${environment.apiUrl}/cursos`;

  constructor(private readonly http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/${id}`);
  }

  matricular(request: MatriculaRequest): Observable<Matricula> {
    return this.http.post<Matricula>(`${environment.apiUrl}/matriculas`, request);
  }
}
