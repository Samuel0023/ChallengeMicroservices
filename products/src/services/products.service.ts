import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto, ProductDTO } from '../dtos';
import { Category, Product, Status } from 'src/entities';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(newProduct: CreateProductDto): Promise<ProductDTO> {
    try {
      const productSchema = new Product();
      productSchema.nombre_producto = newProduct.nombre_producto;
      productSchema.descripcion = newProduct.descripcion;
      productSchema.sku = newProduct.sku;
      productSchema.precio = newProduct.precio;

      const category = new Category();
      category.id = newProduct.categoryId;
      console.log(productSchema);

      productSchema.category = category;
      const status = new Status();
      status.id = newProduct.statusId;
      productSchema.status = status;

      await this.productRepository.save(productSchema);
      const createdProduct = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.status', 'status')
        .where('product.id = :id', { id: productSchema.id })
        .getOne();
      if (!createdProduct) {
        throw new Error('Error al crear el producto');
      }

      const response: ProductDTO = {
        id: createdProduct.id,
        nombre_producto: createdProduct.nombre_producto,
        descripcion: createdProduct.descripcion,
        sku: createdProduct.sku,
        categoria: createdProduct.category.name,
        precio: createdProduct.precio,
        estado: createdProduct.status.name,
      };
      return response;
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async findAll(): Promise<ProductDTO[]> {
    try {
      const products = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.status', 'status')
        .getMany();
      const response = products.map((product) => {
        return {
          id: product.id,
          nombre_producto: product.nombre_producto,
          descripcion: product.descripcion,
          sku: product.sku,
          categoria: product.category.name,
          precio: product.precio,
          estado: product.status.name,
        };
      });
      return response;
    } catch (error) {
      throw new Error('Error al obtener todos los productos');
    }
  }

  async findById(id: number): Promise<ProductDTO> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.status', 'status')
        .where('product.id = :id', { id })
        .getOne();
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      const response: ProductDTO = {
        id: product.id,
        nombre_producto: product.nombre_producto,
        descripcion: product.descripcion,
        sku: product.sku,
        categoria: product.category.name,
        precio: product.precio,
        estado: product.status.name,
      };
      return response;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async update(
    id: number,
    updatedProduct: UpdateProductDto,
  ): Promise<ProductDTO> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.status', 'status')
        .where('product.id = :id', { id })
        .getOne();
      if (!product) {
        throw new Error('Producto no encontrado al querer actualizar');
      }

      if (updatedProduct.categoryId) {
        product.category.id = updatedProduct.categoryId;
      }

      if (updatedProduct.statusId) {
        product.status.id = updatedProduct.statusId;
      }

      Object.assign(product, updatedProduct);
      await this.productRepository.save(product);

      const updatedProductWithRelations = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.status', 'status')
        .where('product.id = :id', { id })
        .getOne();

      if (!updatedProductWithRelations) {
        throw new Error('Error al actualizar el producto');
      }

      const response: ProductDTO = {
        id: updatedProductWithRelations.id,
        nombre_producto: updatedProductWithRelations.nombre_producto,
        descripcion: updatedProductWithRelations.descripcion,
        sku: updatedProductWithRelations.sku,
        categoria: updatedProductWithRelations.category.name,
        precio: updatedProductWithRelations.precio,
        estado: updatedProductWithRelations.status.name,
      };
      return response;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const product = await this.productRepository.findOneBy({ id: id });
      if (!product) {
        throw new Error('Product not found');
      }
      await this.productRepository.delete(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}
