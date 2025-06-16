import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDTO } from './dto';
import { RestaurantResponseDTO } from './dto/restaurant-response.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/')
  async createRestaurant(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantResponseDTO> {
    console.log('--- [RestaurantController] createRestaurant');
    return this.restaurantService.createRestaurant(createRestaurantDTO);
  }
}
