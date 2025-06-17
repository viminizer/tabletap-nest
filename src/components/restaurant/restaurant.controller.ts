import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDTO, RestaurantResponseDTO } from './dto';

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
}
