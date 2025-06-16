export class RestaurantResponseDTO {
  readonly id: string;
  readonly ownerId: string;
  readonly name: string;
  readonly description?: string;
  readonly address: string;
  readonly phone: string;
  readonly email?: string;
  readonly openingTime: number;
  readonly closingTime: number;
  readonly breakTime?: number[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
