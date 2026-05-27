import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Tareas } from './tareas';

describe('Tareas', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    expect(TestBed.createComponent(Tareas).componentInstance).toBeTruthy();
  });

  it('shows tareas after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Tareas);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/tareas').flush([
      {
        id: 4,
        titulo: 'Preparar entrega',
        curso: 'Angular',
        descripcion: 'Validar pantallas',
        fechaEntrega: '2026-05-30',
        estado: 'PENDIENTE',
        prioridad: 'ALTA',
      },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Preparar entrega');
    expect(fixture.nativeElement.textContent).toContain('Urgente');
    http.verify();
  });
});
