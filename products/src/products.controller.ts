import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './services/products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto, ProductDTO, UpdateProductDto } from './dtos';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('get_all_products')
  async getAllProducts(): Promise<{
    success: boolean;
    message: string;
    data: ProductDTO[] | ProductDTO | null;
  }> {
    try {
      await this.productService.findAll();
      return {
        success: true,
        message: 'Get all products successfully',
        data: await this.productService.findAll(),
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }

  @MessagePattern('get_product_by_id')
  async getProductById(@Payload() id: number): Promise<{
    success: boolean;
    message: string;
    data: ProductDTO | null;
  }> {
    try {
      return {
        success: true,
        message: 'Get Product by ID successfully',
        data: await this.productService.findById(id),
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }

  @MessagePattern('create_product')
  async createProduct(@Payload() product: CreateProductDto): Promise<{
    success: boolean;
    message: string;
    data: ProductDTO | any | null;
  }> {
    try {
      const createdProduct = await this.productService.create(product);
      return {
        success: true,
        message: 'Product created successfully',
        data: createdProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.message}`,
        data: product,
      };
    }
  }

  @MessagePattern('update_product')
  async updateProduct(
    @Payload() payload: { id: number; product: UpdateProductDto },
  ): Promise<{
    success: boolean;
    message: string;
    data: ProductDTO | null;
  }> {
    const { id, product } = payload;
    try {
      const updatedProduct = await this.productService.update(id, product);
      return {
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }

  @MessagePattern('delete_product')
  async deleteProduct(@Payload() id: number): Promise<{
    success: boolean;
    message: string;
    data: null;
  }> {
    try {
      await this.productService.delete(id);
      return {
        success: true,
        message: 'Product deleted successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.message}`,
        data: null,
      };
    }
  }
}
