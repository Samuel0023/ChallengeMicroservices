import { Repository } from 'typeorm';
import { Status } from '../entities';

export const seedStatus = async (statusRepository: Repository<Status>) => {
  // Insertar el estado "Habilitado"
  const enabled = new Status();
  enabled.name = 'Habilitado';
  await statusRepository.save(enabled);

  // Insertar el estado "Deshabilitado"
  const disabled = new Status();
  disabled.name = 'Deshabilitado';
  await statusRepository.save(disabled);

  return { enabled, disabled };
};
