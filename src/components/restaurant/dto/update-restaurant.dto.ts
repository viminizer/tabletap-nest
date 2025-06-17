import {
  IsOptional,
  IsString,
  Matches,
  IsEmail,
  IsNumber,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ERestaurantStatus } from '../../../libs/enums';

export class UpdateRestaurantDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ERestaurantStatus)
  status?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'Phone number must be valid' })
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2359)
  openingTime?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2359)
  closingTime?: number;

  @IsOptional()
  @ArrayMinSize(2, { message: 'Break time must have exactly 2 numbers' })
  @ArrayMaxSize(2, { message: 'Break time must have exactly 2 numbers' })
  breakTime?: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;
}
