import {
  IsNotEmpty,
  Min,
  IsOptional,
  IsIn,
  IsNumber,
  ValidateNested,
  Max,
} from 'class-validator';
import { EDirection } from '../../../libs/enums';
import { Type } from 'class-transformer';

class RQSearch {
  @IsOptional()
  location?: string;

  @IsOptional()
  @Min(0)
  @Max(2359)
  @Type(() => Number)
  openingTime?: number;

  @IsOptional()
  @Min(0)
  @Max(2359)
  @Type(() => Number)
  closingTime?: number;
}

export class RestaurantQueryDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'likes', 'views'])
  sort?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  direction?: EDirection;

  @ValidateNested()
  @Type(() => RQSearch)
  search?: RQSearch;
}
