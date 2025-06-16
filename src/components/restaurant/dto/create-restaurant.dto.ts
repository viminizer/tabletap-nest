import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  IsNumber,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateIf,
} from 'class-validator';

export class CreateRestaurantDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'Phone number must be valid' })
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2359)
  openingTime: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2359)
  closingTime: number;

  @IsOptional()
  @ArrayMinSize(2, { message: 'Break time must have exactly 2 numbers' })
  @ArrayMaxSize(2, { message: 'Break time must have exactly 2 numbers' })
  @ValidateIf((o) => o.breakTime && o.breakTime.length === 2)
  breakTime?: number[];

  @IsOptional()
  @IsString()
  location?: string;
}
