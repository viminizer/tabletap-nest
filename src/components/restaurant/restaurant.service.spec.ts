jest.mock('../../libs/utils', () => ({
  castIntoMongoObjectId: jest.fn().mockImplementation((id) => id),
  mapToDTO: jest.fn().mockImplementation((_dto, data) => data),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { EErrorMessage, ERestaurantStatus } from '../../libs/enums';
import {
  mockRestaurantResponseDTO,
  MONGO_OBJECT_ID,
} from './__mocks__/restaurant.mock';
import { castIntoMongoObjectId, mapToDTO } from '../../libs/utils';

const mockRestaurantModel = {
  findOne: jest.fn(),
};

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getModelToken('Restaurant'),
          useValue: mockRestaurantModel,
        },
      ],
    }).compile();
    service = module.get<RestaurantService>(RestaurantService);
    jest.clearAllMocks();
  });

  describe('getRestaurant', () => {
    it('should return restaurant data when found', async () => {
      mockRestaurantModel.findOne.mockReturnValueOnce({
        lean: () => ({
          exec: () => Promise.resolve(mockRestaurantResponseDTO),
        }),
      });
      const result = await service.getRestaurant(MONGO_OBJECT_ID);
      expect(result).toEqual(mockRestaurantResponseDTO);
      expect(castIntoMongoObjectId).toHaveBeenCalledWith(MONGO_OBJECT_ID);
      expect(mapToDTO).toHaveBeenCalled();
      expect(mapToDTO).toHaveBeenCalledTimes(1);
      expect(mockRestaurantModel.findOne).toHaveBeenCalledWith({
        status: ERestaurantStatus.ACTIVE,
        _id: MONGO_OBJECT_ID,
      });
    });

    it('should throw NotFoundException when restaurant not found', async () => {
      mockRestaurantModel.findOne.mockReturnValueOnce({
        lean: () => ({
          exec: () => Promise.resolve(null),
        }),
      });

      await expect(service.getRestaurant(MONGO_OBJECT_ID)).rejects.toThrow(
        new NotFoundException(EErrorMessage.NO_DATA_FOUND),
      );
    });
  });
});
