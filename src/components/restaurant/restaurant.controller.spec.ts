import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import {
  mockCreateRestaurantDTO,
  mockRestaurantResponseDTO,
  mockUpdateRestaurantDTO,
  mockUpdateRestaurantResponseDTO,
  MONGO_OBJECT_ID,
  NON_EXISTENT_ID,
} from './__mocks__/restaurant.mock';
import { NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../../libs/enums';
import { RestaurantResponseDTO, UpdateRestaurantDTO } from './dto';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: {
            createRestaurant: jest.fn(),
            getRestaurant: jest.fn(),
            updateRestaurant: jest.fn(),
            deleteRestaurant: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  describe('createRestaurant', () => {
    it('should call service and return RestaurantResponseDTO', async () => {
      const dto = mockCreateRestaurantDTO;
      const response = mockRestaurantResponseDTO;
      (service.createRestaurant as jest.Mock).mockResolvedValue(response);
      const result = await controller.createRestaurant(dto);
      expect(service.createRestaurant).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });
  });

  describe('getRestaurant', () => {
    it('should call service with restaurant id and return RestaurantResponseDTO ', async () => {
      const id: string = MONGO_OBJECT_ID;
      const response = mockUpdateRestaurantResponseDTO;
      (service.getRestaurant as jest.Mock).mockResolvedValue(response);
      const result = await controller.getRestaurant(id);
      expect(service.getRestaurant).toHaveBeenCalledWith(id);
      expect(result).toEqual(response);
    });

    it('should throw NotFoundException if restaurant does not exist', async () => {
      const id: string = NON_EXISTENT_ID;
      (service.getRestaurant as jest.Mock).mockRejectedValue(
        new NotFoundException(EErrorMessage.NO_DATA_FOUND),
      );
      await expect(controller.getRestaurant(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateRestaurant', () => {
    it('should call service with restaurant id and dto, then return RestaurantResponseDTO', async () => {
      const id: string = MONGO_OBJECT_ID;
      const dto: UpdateRestaurantDTO = mockUpdateRestaurantDTO;
      const response: RestaurantResponseDTO = mockUpdateRestaurantResponseDTO;
      (service.updateRestaurant as jest.Mock).mockResolvedValue(response);
      const result = await controller.updateRestaurant(id, dto);
      expect(service.updateRestaurant).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(response);
    });

    it('should throw NotFoundException if restaurant does not exist', async () => {
      const id: string = NON_EXISTENT_ID;
      const dto: UpdateRestaurantDTO = mockUpdateRestaurantDTO;
      (service.updateRestaurant as jest.Mock).mockRejectedValue(
        new NotFoundException(EErrorMessage.NO_DATA_FOUND),
      );
      expect(controller.updateRestaurant(id, dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteRestaurant', () => {
    it('should call service with id and return NO_CONTENT status code', async () => {
      const id = MONGO_OBJECT_ID;
      (service.deleteRestaurant as jest.Mock).mockResolvedValue(undefined);
      const response = await controller.deleteRestaurant(id);
      expect(service.deleteRestaurant).toHaveBeenCalledWith(id);
      expect(response).toBeUndefined();
    });

    it('should throw NotFoundException if restaurant does not exist', async () => {
      const id: string = NON_EXISTENT_ID;
      (service.deleteRestaurant as jest.Mock).mockRejectedValue(
        new NotFoundException(EErrorMessage.NO_DATA_FOUND),
      );
      expect(controller.deleteRestaurant(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
