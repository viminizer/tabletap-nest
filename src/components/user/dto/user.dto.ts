import { ObjectId } from 'mongoose';
import { EUserAuthType, EUserStatus, EUserType } from 'src/libs/enums';

export class UserDto {
  _id: ObjectId;
  readonly telegramId: string;
  readonly userType: EUserType;
  readonly userStatus: EUserStatus;
  readonly userPhone: string;
  readonly userName?: string;
  readonly userPassword?: string;
  readonly userFullName?: string;
  readonly userAddress?: string;
  readonly userImage: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class UserInputDto {
  readonly initData: string;
  readonly isBot?: boolean;
  readonly telegramId: string;
  readonly userPhone: string;
  readonly userName: string;
  readonly userPassword?: string;
  readonly userFullName: string;
  readonly userImage: string;
}

export class TotalCounter {
  totalUsers?: number;
}

export class Users {
  list: UserDto[];
  metaCounter: TotalCounter[];
}
