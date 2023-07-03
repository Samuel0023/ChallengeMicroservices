import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { Product } from 'src/entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(newProduct: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(newProduct);
      return this.productRepository.save(product);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (error) {
      throw new Error('Error al obtener todos los productos');
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id: id });
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async update(id: number, updatedProduct: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id: id });
      if (!product) {
        throw new Error('Producto no encontrado al querer actualizar');
      }

      Object.assign(product, updatedProduct);
      return this.productRepository.save(product);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}
