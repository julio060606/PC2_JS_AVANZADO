import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cursos } from './cursos';

describe('Cursos', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Cursos],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    expect(TestBed.createComponent(Cursos).componentInstance).toBeTruthy();
  });

  it('shows cursos after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Cursos],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Cursos);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/cursos').flush([
      {
        id: 3,
        codigo: 'ANG201',
        nombre: 'Angular inicial',
        creditos: 4,
        modalidad: 'HIBRIDA',
        vacantes: 9,
      },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('ANGULAR INICIAL');
    expect(fixture.nativeElement.textContent).toContain('9 vacantes');
    http.verify();
  });
});
