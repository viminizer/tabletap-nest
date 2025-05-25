import { ObjectId } from 'mongoose';
import { UserAuthType, UserStatus, UserType } from 'src/libs/enums/user.enums';

export class UserDto {
  readonly _id: ObjectId;
  readonly telegramId: string;
  readonly userType: UserType;
  readonly userStatus: UserStatus;
  readonly userAuthType: UserAuthType;
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
