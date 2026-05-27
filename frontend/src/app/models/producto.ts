export interface Producto {
  id?: number; // El '?' es vital para evitar errores de TypeScript al insertar
  nombre: string;
  precio: number;
  stock: number;
}