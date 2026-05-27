import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Volvemos a nuestros datos de mentira para no bloquearnos
  private mockProductos: Producto[] = [
    { id: 1, nombre: 'Laptop HP', precio: 1500, stock: 10 },
    { id: 2, nombre: 'Monitor LG', precio: 300, stock: 25 }
  ];

  constructor() { }

  // Retornamos la lista falsa
  getProductos(): Observable<Producto[]> {
    return of(this.mockProductos); 
  }

  // Insertamos en la lista falsa
  insertarProducto(producto: Producto): Observable<Producto> {
    producto.id = this.mockProductos.length + 1; 
    this.mockProductos.push(producto);
    return of(producto);
  }
}

/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // Para el examen, usarás localhost primero. Luego cambiarás a la URL de Render.
  private apiUrl = 'http://localhost:8080/api/productos'; 

  constructor(private http: HttpClient) { }

  // Verificado: Petición GET al backend
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Verificado: Petición POST al backend enviando el objeto producto
  insertarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}*/