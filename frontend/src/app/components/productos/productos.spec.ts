import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductosComponent } from './productos';

describe('ProductosComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    expect(TestBed.createComponent(ProductosComponent).componentInstance).toBeTruthy();
  });

  it('shows productos after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductosComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/productos').flush([
      { id: 1, nombre: 'Cafe americano', categoria: 'Bebidas', precio: 4.5, stock: 3 },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Cafe americano');
    http.verify();
  });
});
