import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ApiError } from '../../models/api-error';
import { PedidoRequest, Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  readonly productos = signal<Producto[]>([]);
  readonly mensaje = signal('');
  readonly error = signal('');
  readonly enviando = signal(false);
  pedido: PedidoRequest = { nombreEstudiante: '', productoId: null, cantidad: 1, observacion: '' };

  constructor(private readonly productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  registrar(): void {
    this.mensaje.set('');
    this.error.set('');
    this.enviando.set(true);
    this.productoService.registrarPedido(this.pedido).subscribe({
      next: (respuesta) => {
        this.mensaje.set(`Pedido #${respuesta.id} registrado correctamente para ${respuesta.nombreEstudiante}.`);
        this.pedido = { nombreEstudiante: '', productoId: null, cantidad: 1, observacion: '' };
        this.enviando.set(false);
        this.cargarProductos();
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(this.mensajeError(response));
        this.enviando.set(false);
      },
    });
  }

  private cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => this.productos.set(productos),
      error: (response: HttpErrorResponse) => this.error.set(this.mensajeError(response)),
    });
  }

  private mensajeError(response: HttpErrorResponse): string {
    return (response.error as ApiError)?.message ?? 'No se pudo completar la operacion.';
  }
}
