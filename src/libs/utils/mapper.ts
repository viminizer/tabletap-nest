import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

export function mapToDTO<T, V>(dtoClass: new () => T, plain: V): T {
  return plainToInstance(dtoClass, plain, {
    excludeExtraneousValues: true,
  });
}

export const castIntoMongoObjectId = (target: any) => {
  if (!mongoose.Types.ObjectId.isValid(target)) {
    throw new BadRequestException('Invalid restaurant ID format');
  }
  return typeof target === 'string'
    ? new mongoose.Types.ObjectId(target)
    : target;
};
