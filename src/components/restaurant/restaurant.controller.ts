import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantDTO,
  RestaurantQueryDTO,
  RestaurantResponseDTO,
  UpdateRestaurantDTO,
} from './dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getRestaurants(@Query() restaurantQuery: RestaurantQueryDTO) {
    console.log('--- [RestaurantController] getRestaurants');
    console.dir(restaurantQuery, { depth: null });
  }

  @Post('create')
  async createRestaurant(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantResponseDTO> {
    console.log('--- [RestaurantController] createRestaurant');
    return this.restaurantService.createRestaurant(createRestaurantDTO);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string) {
    console.log('--- [RestaurantController] getRestaurant');
    return this.restaurantService.getRestaurant(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDTO: UpdateRestaurantDTO,
  ) {
    console.log('--- [RestaurantController] updateRestaurant');
    return this.restaurantService.updateRestaurant(id, updateRestaurantDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRestaurant(@Param('id') id: string): Promise<void> {
    await this.restaurantService.deleteRestaurant(id);
  }
}
