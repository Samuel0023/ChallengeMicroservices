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
  categoryId: number;

  @IsNotEmpty()
  @IsDecimal()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;
}
