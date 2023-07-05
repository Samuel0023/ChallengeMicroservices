import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product.interface';
import { CreateProductDto, UpdateProductDto } from '../dtos';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productService.getAllProducts();
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.getProductById(id);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async createProduct(@Body() newProduct: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.createProduct(newProduct);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async updateProduct(
    @Param('id') id: number,
    @Body() updatedProduct: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(id, updatedProduct);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}
