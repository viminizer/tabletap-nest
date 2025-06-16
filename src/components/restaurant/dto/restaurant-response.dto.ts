import { Expose } from 'class-transformer';

export class RestaurantResponseDTO {
  @Expose()
  readonly id: string;

  @Expose()
  readonly ownerId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description?: string;

  @Expose()
  readonly address: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly email?: string;

  @Expose()
  readonly openingTime: number;

  @Expose()
  readonly closingTime: number;

  @Expose()
  readonly breakTime?: number[];

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
