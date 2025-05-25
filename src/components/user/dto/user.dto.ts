import { ObjectId } from 'mongoose';
import { EUserAuthType, EUserStatus, EUserType } from 'src/libs/enums';

export class UserDto {
  readonly _id: ObjectId;
  readonly telegramId: string;
  readonly userType: EUserType;
  readonly userStatus: EUserStatus;
  readonly userAuthType: EUserAuthType;
  readonly userPhone: string;
  readonly userName?: string;
  readonly userPassword?: string;
  readonly userFullName?: string;
  readonly userAddress?: string;
  readonly userImage: string;
  readonly userRestaurants: number;
  readonly userPoints: number;
  readonly userRank: number;
  readonly userBlocks: number;
  readonly languageCode: string;
  readonly isPremium: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class UserInputDto {
  readonly initData: string;
  readonly isBot: boolean;
  readonly telegramId: string;
  readonly userPhone?: string;
  readonly userName: string;
  readonly userPassword?: string;
  readonly userFullName: string;
  readonly userImage: string;
  readonly languageCode: string;
  readonly isPremium: boolean;
}

export class TotalCounter {
  totalUsers?: number;
}

export class Users {
  list: UserDto[];
  metaCounter: TotalCounter[];
}
