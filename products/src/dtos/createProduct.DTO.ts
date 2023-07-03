import { IsNotEmpty, IsNumber, IsString, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nombre_producto: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  sku: number;

  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;

  @IsNotEmpty()
  @IsDecimal()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  id_estado: number;
}
