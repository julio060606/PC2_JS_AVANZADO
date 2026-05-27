import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class ProductosComponent implements OnInit {
  readonly listaProductos = signal<Producto[]>([]);
  readonly error = signal('');
  readonly cargando = signal(false);

  constructor(private readonly productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.cargando.set(true);
    this.productoService.getProductos().subscribe({
      next: (datos) => {
        this.listaProductos.set(datos);
        this.cargando.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set((response.error as ApiError)?.message ?? 'No se pudo cargar los productos.');
        this.cargando.set(false);
      },
    });
  }
}
