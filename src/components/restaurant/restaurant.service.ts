import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantResponseDTO } from './dto/restaurant-response.dto';
import { CreateRestaurantDTO } from './dto';
import { EErrorMessage } from 'src/libs/enums';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantResponseDTO>,
  ) {}

  public async createRestaurant(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantResponseDTO> {
    try {
      const newRest = await this.restaurantModel.create(createRestaurantDTO);
      return newRest;
    } catch (err) {
      console.log('[RestaurantService: createRestaurant] ', err);
      throw new InternalServerErrorException(EErrorMessage.CREATE_FAILED);
    }
  }
}
