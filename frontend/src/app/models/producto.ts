export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface PedidoRequest {
  nombreEstudiante: string;
  productoId: number | null;
  cantidad: number;
  observacion: string;
}

export interface Pedido {
  id: number;
  nombreEstudiante: string;
  producto: Producto;
  cantidad: number;
  observacion?: string;
  fechaRegistro: string;
}
