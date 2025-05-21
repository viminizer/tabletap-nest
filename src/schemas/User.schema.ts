import { Schema } from 'mongoose';
import { UserAuthType, UserStatus, UserType } from '../libs/enums/user.enums';

const UserSchema = new Schema(
  {
    userType: {
      type: String,
      enum: UserType,
      default: UserType.USER,
    },
    userStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    userAuthType: {
      type: String,
      enum: UserAuthType,
      default: UserAuthType.TELEGRAM,
    },
    userPhone: {
      type: String,
      index: { unique: true, sparse: true },
    },
    userNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
    userPassword: {
      type: String,
      select: false,
      required: true,
    },
    userFullName: {
      type: String,
    },
    userImage: {
      type: String,
      default: '',
    },
    userAddress: {
      type: String,
    },
    userRestaurants: {
      type: Number,
      default: 0,
    },
    userPoints: {
      type: Number,
      default: 0,
    },
    userRank: {
      type: Number,
      default: 0,
    },
    userBlocks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'users' },
);

export default UserSchema;
