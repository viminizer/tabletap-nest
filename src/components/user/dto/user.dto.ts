import { ObjectId } from 'mongoose';
import { UserAuthType, UserStatus, UserType } from 'src/libs/enums/user.enums';

export class UserDto {
  readonly _id: ObjectId;
  readonly userType: UserType;
  readonly userStatus: UserStatus;
  readonly userAuthType: UserAuthType;
  readonly userPhone: string;
  readonly userNick: string;
  readonly userPassword?: string;
  readonly userFullName?: string;
  readonly userAddress?: string;
  readonly userImage: string;
  readonly userRestaurants: number;
  readonly userPoints: number;
  readonly userRank: number;
  readonly userBlocks: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class TotalCounter {
  totalUsers?: number;
}

export class Users {
  list: UserDto[];
  metaCounter: TotalCounter[];
}
