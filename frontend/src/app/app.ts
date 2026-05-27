import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importa tu componente de productos
import { ProductosComponent } from './components/productos/productos'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Quitamos RouterOutlet de aquí
  imports: [CommonModule, ProductosComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'frontend';
}