import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: RestaurantSchema, name: 'Restaurant' },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
