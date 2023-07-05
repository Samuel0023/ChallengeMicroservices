import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../src/services/products.service';
import { Product } from '../src/entities/product.entity';
import { CreateProductDto } from '../src/dtos/createProduct.dto';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'ProductRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>('ProductRepository');
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      // Crea una instancia simulada del repositorio
      const saveMock = jest.fn().mockResolvedValueOnce({});
      const productRepositoryMock = {
        create: jest.fn().mockReturnValue({}),
        save: saveMock,
      };

      jest
        .spyOn(productService, 'getProductRepository')
        .mockReturnValue(productRepositoryMock as any);

      const createProductDto: CreateProductDto = {
        nombre_producto: 'Skip',
        descripcion: 'Jabon liquido para ropa',
        sku: 11,
        categoryId: 1,
        precio: 3.52,
        statusId: 2,
      };
      const createdProduct = await productService.create(createProductDto);

      expect(createdProduct).toBeDefined();
      expect(saveMock).toHaveBeenCalledWith(createProductDto);
    });
  });
});
