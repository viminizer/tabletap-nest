import { plainToInstance } from 'class-transformer';

export function mapToDTO<T, V>(dtoClass: new () => T, plain: V): T {
  return plainToInstance(dtoClass, plain, {
    excludeExtraneousValues: true,
  });
}
