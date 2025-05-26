import { Schema } from 'mongoose';
import { EUserAuthType, EUserStatus, EUserType } from 'src/libs/enums';

const UserSchema = new Schema(
  {
    userType: {
      type: String,
      enum: EUserType,
      default: EUserType.USER,
    },
    userStatus: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.ACTIVE,
    },
    userAuthType: {
      type: String,
      enum: EUserAuthType,
      default: EUserAuthType.TELEGRAM,
    },
    telegramId: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
    userPhone: {
      type: String,
      index: { unique: true, sparse: true },
    },
    userName: {
      type: String,
      index: { unique: true, sparse: true },
    },
    userPassword: {
      type: String,
      select: false,
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
