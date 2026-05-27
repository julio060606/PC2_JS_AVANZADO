import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Corregimos la importación para usar el nombre real
import { ProductosComponent } from './productos'; 

describe('ProductosComponent', () => {
  // 2. Actualizamos el tipo de la variable
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Actualizamos el import del módulo
      imports: [ProductosComponent], 
    }).compileComponents();

    // 4. Actualizamos la creación del componente
    fixture = TestBed.createComponent(ProductosComponent); 
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});