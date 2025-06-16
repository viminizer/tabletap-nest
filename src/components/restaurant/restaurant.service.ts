import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantResponseDTO } from './dto/restaurant-response.dto';
import { CreateRestaurantDTO } from './dto';
import { EErrorMessage, ERestaurantStatus } from 'src/libs/enums';
import { castIntoMongoObjectId, mapToDTO } from 'src/libs/utils';

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
      return mapToDTO(RestaurantResponseDTO, newRest.toObject());
    } catch (err) {
      console.log('[RestaurantService: createRestaurant] ', err);
      throw new InternalServerErrorException(EErrorMessage.CREATE_FAILED);
    }
  }

  public async getRestaurant(id: string): Promise<RestaurantResponseDTO> {
    const objectId = castIntoMongoObjectId(id);
    const result = await this.restaurantModel
      .findOne({
        restaurantStatus: ERestaurantStatus.ACTIVE,
        _id: objectId,
      })
      .lean()
      .exec();
    if (!result) {
      throw new BadRequestException(EErrorMessage.NO_DATA_FOUND);
    }
    return mapToDTO(RestaurantResponseDTO, result);
  }
}
