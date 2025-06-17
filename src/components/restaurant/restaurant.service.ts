import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateRestaurantDTO,
  RestaurantResponseDTO,
  UpdateRestaurantDTO,
} from './dto';
import { EErrorMessage, ERestaurantStatus } from 'src/libs/enums';
import { castIntoMongoObjectId, cleanPayload, mapToDTO } from 'src/libs/utils';

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
      throw new InternalServerErrorException(
        err.message ? err.message : EErrorMessage.CREATE_FAILED,
      );
    }
  }

  public async getRestaurant(id: string): Promise<RestaurantResponseDTO> {
    const objectId = castIntoMongoObjectId(id);
    const result = await this.restaurantModel
      .findOne({
        status: ERestaurantStatus.ACTIVE,
        _id: objectId,
      })
      .lean()
      .exec();
    if (!result) {
      throw new BadRequestException(EErrorMessage.NO_DATA_FOUND);
    }
    return mapToDTO(RestaurantResponseDTO, result);
  }

  public async updateRestaurant(
    id: string,
    updateRestaurantDTO: UpdateRestaurantDTO,
  ): Promise<RestaurantResponseDTO> {
    const objectId = castIntoMongoObjectId(id);
    const cPayload = cleanPayload(updateRestaurantDTO);
    const result = await this.restaurantModel.findOneAndUpdate(
      {
        _id: objectId,
        status: ERestaurantStatus.ACTIVE,
      },
      cPayload,
      { new: true, lean: true },
    );
    if (!result) {
      //TODO:(kevin): create better error handling for specific errors
      throw new InternalServerErrorException(EErrorMessage.UPDATE_FAILED);
    }
    return mapToDTO(RestaurantResponseDTO, result);
  }

  public async deleteRestaurant(id: string): Promise<void> {
    const objectId = castIntoMongoObjectId(id);
    const result = await this.restaurantModel.findOneAndDelete({
      _id: objectId,
    });
    if (!result) {
      throw new NotFoundException(EErrorMessage.NO_DATA_FOUND);
    }
  }
}
