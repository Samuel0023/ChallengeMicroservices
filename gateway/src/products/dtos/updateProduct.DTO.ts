import { IsString, IsInt, Validate } from 'class-validator';
import { IsDecimalValidator } from 'src/utils/customDecimalValidator';

export class UpdateProductDto {
  @IsString()
  nombre_producto?: string;

  @IsString()
  descripcion?: string;

  @IsInt()
  sku?: number;

  @IsInt()
  categoryId?: number;

  @Validate(IsDecimalValidator)
  precio?: number;

  @IsInt()
  statusId?: number;
}
