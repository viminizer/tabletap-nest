import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { RestaurantResponseDTO } from './dto/restaurant-response.dto';

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
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  describe('createRestaurant', () => {
    it('should call service and return RestaurantResponseDTO', async () => {
      const dto: CreateRestaurantDTO = {
        ownerId: '685018c0ccc63266b76b0321',
        name: 'Test Restaurant',
        description: 'Cozy place with beautiful sunset views.',
        address: '789 Ocean Drive, Miami, FL',
        phone: '+13051234567',
        email: 'contact@sunsetgrill.com',
        openingTime: 1100,
        closingTime: 2230,
        breakTime: [1500, 1600],
        location: 'Miami Beach',
      };
      const response: RestaurantResponseDTO = {
        id: expect.any(String),
        status: 'ACTIVE',
        ownerId: '685018c0ccc63266b76b0321',
        name: 'Test Restaurant',
        description: 'Cozy place with beautiful sunset views.',
        address: '789 Ocean Drive, Miami, FL',
        phone: '+13051234567',
        email: 'contact@sunsetgrill.com',
        openingTime: 1100,
        closingTime: 2230,
        breakTime: [1500, 1600],
        location: 'Miami Beach',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      (service.createRestaurant as jest.Mock).mockResolvedValue(response);

      const result = await controller.createRestaurant(dto);
      expect(service.createRestaurant).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });
  });
});
