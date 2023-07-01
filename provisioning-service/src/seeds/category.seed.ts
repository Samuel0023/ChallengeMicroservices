import { Repository } from 'typeorm';
import { Category } from '../entities';

export const seedCategory = async (
  categoryRepository: Repository<Category>,
) => {
  // Insertar el estado "Cuidado personal"
  const personalCare = new Category();
  personalCare.name = 'Cuidado personal';
  await categoryRepository.save(personalCare);

  // Insertar el estado "Alacenas"
  const cupboard = new Category();
  cupboard.name = 'Alacenas';
  await categoryRepository.save(cupboard);

  return { personalCare, cupboard };
};
