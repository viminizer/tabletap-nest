import { Schema } from 'mongoose';
import { EUserStatus, EUserType } from 'src/libs/enums';

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
  },
  { timestamps: true, collection: 'users' },
);

export default UserSchema;
