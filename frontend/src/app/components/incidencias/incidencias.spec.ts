import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Incidencias } from './incidencias';

describe('Incidencias', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Incidencias],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    expect(TestBed.createComponent(Incidencias).componentInstance).toBeTruthy();
  });

  it('shows incidencias after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Incidencias],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Incidencias);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/incidencias').flush([
      {
        id: 2,
        nombreReportante: 'Ana Torres',
        rolReportante: 'ESTUDIANTE',
        aula: 'LAB-01',
        equipo: 'PC-05',
        tipo: 'Hardware',
        descripcion: 'No inicia sesion',
        estado: 'PENDIENTE',
        fechaRegistro: '2026-05-27T00:00:00Z',
      },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('LAB-01');
    expect(fixture.nativeElement.textContent).toContain('Pendiente');
    http.verify();
  });
});
