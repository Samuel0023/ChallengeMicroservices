import { Repository } from 'typeorm';
import { Category, Product, Status } from '../entities';
import { seedStatus, seedCategory } from './index';
import { calculateSKU } from '../utils/calculateSKU';

export const productsSeeder = async (
  productRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
  statusRepository: Repository<Status>,
) => {
  try {
    const { enabled, disabled } = await seedStatus(statusRepository);
    const { personalCare, cupboard } = await seedCategory(categoryRepository);
    // Insertar el estado "jabon liquido"
    const liquidSoap = new Product();
    liquidSoap.sku = calculateSKU(1, personalCare.id);
    liquidSoap.category = personalCare;
    liquidSoap.nombre_producto = 'Skip';
    liquidSoap.descripcion = 'Jabon liquido para ropa';
    liquidSoap.precio = 3.5;
    liquidSoap.status = enabled;
    await productRepository.save(liquidSoap);
    // Insertar el estado "Deshabilitado"
    const coffee = new Product();
    coffee.sku = calculateSKU(2, cupboard.id);
    coffee.category = cupboard;
    coffee.nombre_producto = 'Cafe la Virginia';
    coffee.descripcion = 'Cafe instantaneo (comun)';
    coffee.precio = 1.5;
    coffee.status = disabled;
    await productRepository.save(coffee);
  } catch (error) {
    throw Error('Error: ' + error.message);
  }
};
