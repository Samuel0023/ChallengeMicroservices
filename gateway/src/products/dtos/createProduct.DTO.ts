import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsDecimalValidator } from 'src/utils/customDecimalValidator';

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
  @Validate(IsDecimalValidator)
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;
}
