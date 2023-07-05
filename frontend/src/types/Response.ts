import { Product } from "./Product";
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: [] | null;
}
// Tipo para la respuesta exitosa del producto
export interface ProductResponse extends ApiResponse<Product> {
  success: true;
}

// Tipo para la respuesta de error del producto
export interface ErrorResponse extends ApiResponse<null> {
  success: false;
}

// Tipo para la respuesta con error interno del servidor
export type InternalServerErrorResponse = ErrorResponse & {
  statusCode: number;
};

// Tipo para la respuesta de error genérico
export type GenericErrorResponse = ErrorResponse & {
  statusCode?: number;
};

export type ProductApiResponse = ProductResponse | InternalServerErrorResponse | GenericErrorResponse ;