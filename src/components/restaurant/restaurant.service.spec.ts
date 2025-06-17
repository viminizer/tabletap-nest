jest.mock('../../libs/utils', () => ({
  castIntoMongoObjectId: jest.fn().mockImplementation((id) => id),
  mapToDTO: jest.fn().mockImplementation((_dto, data) => data),
  cleanPayload: jest.fn().mockImplementation((dto) => dto),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EErrorMessage, ERestaurantStatus } from '../../libs/enums';
import {
  mockCreateRestaurantDTO,
  mockRestaurantResponseDTO,
  mockUpdateRestaurantDTO,
  mockUpdateRestaurantResponseDTO,
  MONGO_OBJECT_ID,
} from './__mocks__/restaurant.mock';
import {
  castIntoMongoObjectId,
  cleanPayload,
  mapToDTO,
} from '../../libs/utils';

const mockRestaurantModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
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

  describe('createRestaurant', () => {
    it('should take CreateRestaurantDto and return new restaurant', async () => {
      mockRestaurantModel.create.mockReturnValueOnce({
        toObject: () => mockRestaurantResponseDTO,
      });
      const result = await service.createRestaurant(mockCreateRestaurantDTO);
      expect(mockRestaurantModel.create).toHaveBeenCalledWith(
        mockCreateRestaurantDTO,
      );
      expect(result).toEqual(mockRestaurantResponseDTO);
      expect(mapToDTO).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalServerErrorException when restaurant is not created', async () => {
      mockRestaurantModel.create.mockRejectedValue(
        new InternalServerErrorException(EErrorMessage.CREATE_FAILED),
      );
      await expect(
        service.createRestaurant(mockCreateRestaurantDTO),
      ).rejects.toThrow(
        new InternalServerErrorException(EErrorMessage.CREATE_FAILED),
      );
    });
  });

  describe('updateRestaurant', () => {
    it('should update and return RestaurantResponseDTO', async () => {
      mockRestaurantModel.findOneAndUpdate.mockReturnValue(
        mockUpdateRestaurantResponseDTO,
      );
      const result = await service.updateRestaurant(
        MONGO_OBJECT_ID,
        mockUpdateRestaurantDTO,
      );
      expect(result).toEqual(mockUpdateRestaurantResponseDTO);
      expect(mockRestaurantModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: MONGO_OBJECT_ID, status: ERestaurantStatus.ACTIVE },
        mockUpdateRestaurantDTO,
        { new: true, lean: true },
      );
      expect(cleanPayload).toHaveBeenCalledWith(mockUpdateRestaurantDTO);
      expect(cleanPayload).toHaveBeenCalledTimes(1);
      expect(mapToDTO).toHaveBeenCalledTimes(1);
      expect(castIntoMongoObjectId).toHaveBeenCalledWith(MONGO_OBJECT_ID);
      expect(castIntoMongoObjectId).toHaveBeenCalledTimes(1);
    });

    it('should throw InternalServerErrorException on update failure', async () => {
      mockRestaurantModel.findOneAndUpdate.mockRejectedValue(
        new InternalServerErrorException(EErrorMessage.UPDATE_FAILED),
      );

      await expect(
        service.updateRestaurant(MONGO_OBJECT_ID, mockUpdateRestaurantDTO),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.updateRestaurant(MONGO_OBJECT_ID, mockUpdateRestaurantDTO),
      ).rejects.toThrow(EErrorMessage.UPDATE_FAILED);
    });
  });
});
