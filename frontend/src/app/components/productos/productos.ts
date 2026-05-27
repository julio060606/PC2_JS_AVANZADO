import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto'; 
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Verificado: Módulos necesarios
  templateUrl: './productos.html', 
  styleUrls: ['./productos.css']   
})
export class ProductosComponent implements OnInit { 
  listaProductos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', precio: 0, stock: 0 };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.productoService.getProductos().subscribe(datos => {
      this.listaProductos = datos; 
    });
  }

  guardarProducto(): void {
    this.productoService.insertarProducto(this.nuevoProducto).subscribe(() => {
      this.obtenerDatos(); // Recargar tabla
      this.nuevoProducto = { nombre: '', precio: 0, stock: 0 }; // Limpiar inputs
    });
  }
}