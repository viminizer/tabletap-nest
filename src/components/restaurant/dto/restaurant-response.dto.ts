import { Expose, Transform } from 'class-transformer';

export class RestaurantResponseDTO {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  readonly id: string;

  @Expose()
  @Transform(({ obj }) => obj.ownerId.toString())
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
