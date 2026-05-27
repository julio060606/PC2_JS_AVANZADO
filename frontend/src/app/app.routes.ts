import { Routes } from '@angular/router';
import { Cursos } from './components/cursos/cursos';
import { MatriculaComponent } from './components/cursos/matricula';
import { Inicio } from './components/inicio/inicio';
import { Incidencias } from './components/incidencias/incidencias';
import { IncidenciasDashboard } from './components/incidencias/incidencias-dashboard';
import { NuevaIncidencia } from './components/incidencias/nueva-incidencia';
import { Pedidos } from './components/productos/pedidos';
import { ProductosComponent } from './components/productos/productos';
import { NuevaTarea } from './components/tareas/nueva-tarea';
import { Tareas } from './components/tareas/tareas';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos', component: Pedidos },
  { path: 'incidencias', redirectTo: 'incidencias/dashboard', pathMatch: 'full' },
  { path: 'incidencias/dashboard', component: IncidenciasDashboard },
  { path: 'incidencias/nueva', component: NuevaIncidencia },
  { path: 'incidencias/lista', component: Incidencias },
  { path: 'cursos', component: Cursos },
  { path: 'matricula', component: MatriculaComponent },
  { path: 'tareas', component: Tareas },
  { path: 'tareas/nueva', component: NuevaTarea },
  { path: '**', redirectTo: '' },
];
