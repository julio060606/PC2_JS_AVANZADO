import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pedido, PedidoRequest, Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly url = `${environment.apiUrl}/productos`;

  constructor(private readonly http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrarPedido(pedido: PedidoRequest): Observable<Pedido> {
    return this.http.post<Pedido>(`${environment.apiUrl}/pedidos`, pedido);
  }
}
