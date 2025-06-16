import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [UserModule, AuthModule, RestaurantModule, TableModule],
})
export class ComponentsModule {}
