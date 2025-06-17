import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantDTO,
  RestaurantResponseDTO,
  UpdateRestaurantDTO,
} from './dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/create')
  async createRestaurant(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantResponseDTO> {
    console.log('--- [RestaurantController] createRestaurant');
    return this.restaurantService.createRestaurant(createRestaurantDTO);
  }

  @Get('/:id')
  async getRestaurant(@Param('id') id: string) {
    console.log('--- [RestaurantController] getRestaurant');
    return this.restaurantService.getRestaurant(id);
  }

  @Put('/:id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDTO: UpdateRestaurantDTO,
  ) {
    console.log('--- [RestaurantController] updateRestaurant');
    return this.restaurantService.updateRestaurant(id, updateRestaurantDTO);
  }
}
