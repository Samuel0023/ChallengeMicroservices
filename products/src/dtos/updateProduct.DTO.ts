import { IsNumber, IsString, IsDecimal } from 'class-validator';
export class UpdateProductDto {
  @IsString()
  nombre_producto?: string;

  @IsString()
  descripcion?: string;

  @IsNumber()
  sku?: number;

  @IsNumber()
  id_categoria?: number;

  @IsDecimal()
  precio?: number;

  @IsNumber()
  id_estado?: number;
}
