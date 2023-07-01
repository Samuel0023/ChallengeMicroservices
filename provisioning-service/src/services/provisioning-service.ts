import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, Status, Product } from '../entities';
import { seedStatus } from '../seeds';

@Injectable()
export class ProvisioningService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createTables(): Promise<void> {
    await this.createCategoryTable();
    await this.createStatusTable();
    await this.createProductTable();

    // inject seeders :D
  }
  async injectSeeders(): Promise<void> {
    // inject seeders :D

  }
  async init(): void {
    try {
      await this.createTables();
      await this.injectSeeders();
      return true;
    } catch (error) {
      
    }
  }

  private async createCategoryTable(): Promise<void> {
    await this.categoryRepository.query(
      `CREATE TABLE IF NOT EXISTS category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )`,
    );
  }

  private async createStatusTable(): Promise<void> {
    await this.statusRepository.query(
      `CREATE TABLE IF NOT EXISTS status (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )`,
    );
  }

  private async createProductTable(): Promise<void> {
    await this.productRepository.query(
      `CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        sku INT NOT NULL,
        categoryId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        statusId INT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES category (id),
        FOREIGN KEY (statusId) REFERENCES status (id)
      )`,
    );
  }
}
