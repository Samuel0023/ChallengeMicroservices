import { Repository } from 'typeorm';
import { Category, Product, Status } from '../entities';
import { seedStatus, seedCategory } from './index';

const calculateSKU = (id: number, categoryId: number): number => {
  const sku = `${id}${categoryId}`;
  return parseInt(sku);
};

export const productsSeeder = async (
  productRepository: Repository<Product>,
  categoryRepository: Repository<Category>,
  statusRepository: Repository<Status>,
) => {
  const { enabled, disabled } = await seedStatus(statusRepository);
  const { personalCare, cupboard } = await seedCategory(categoryRepository);
  // Insertar el estado "jabon liquido"
  const liquidSoap = new Product();
  liquidSoap.category = personalCare;
  liquidSoap.sku = calculateSKU(liquidSoap.id, personalCare.id);
  await productRepository.save(liquidSoap);

  // Insertar el estado "Deshabilitado"
  const deshabilitado = new Product();
  deshabilitado.name = 'Deshabilitado';
  await productRepository.save(deshabilitado);
};
