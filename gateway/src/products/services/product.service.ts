import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable()
export class ProductService {
  private readonly productClient: ClientProxy;

  constructor() {
    this.productClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    });
  }

  async getAllProducts(): Promise<Product[]> {
    const products$ = this.productClient.send<Product[]>(
      'get_all_products',
      {},
    );
    return await firstValueFrom(products$);
  }
  getProductById(id: number): Promise<Product> {
    return firstValueFrom(
      this.productClient.send<Product>('get_product_by_id', id),
    );
  }
  createProduct(product: Partial<Product>): Promise<Product> {
    return firstValueFrom(
      this.productClient.send<Product>('create_product', product),
    );
  }
  updateProduct(id: number, product: Partial<Product>) {
    return firstValueFrom(
      this.productClient.send<Product>('update_product', { id, product }),
    );
  }
  deleteProduct(id: number): Promise<void> {
    return firstValueFrom(this.productClient.send<void>('delete_product', id));
  }
}
