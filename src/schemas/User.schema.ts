import { Schema } from 'mongoose';
import { UserAuthType, UserStatus, UserType } from '../libs/enums/member.enum';

const UserSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: UserType,
      default: UserType.USER,
    },
    memberStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    memberAuthType: {
      type: String,
      enum: UserAuthType,
      default: UserAuthType.PHONE,
    },
    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
    memberPassword: {
      type: String,
      select: false,
      required: true,
    },
    memberFullName: {
      type: String,
    },
    memberImage: {
      type: String,
      default: '',
    },
    memberAddress: {
      type: String,
    },
    memberDesc: String,
    memberProperties: {
      type: Number,
      default: 0,
    },
    memberArticles: {
      type: Number,
      default: 0,
    },
    memberFollowers: {
      type: Number,
      default: 0,
    },
    memberFollowings: {
      type: Number,
      default: 0,
    },
    memberPoints: {
      type: Number,
      default: 0,
    },
    memberLikes: {
      type: Number,
      default: 0,
    },
    memberViews: {
      type: Number,
      default: 0,
    },
    memberComments: {
      type: Number,
      default: 0,
    },
    memberRank: {
      type: Number,
      default: 0,
    },
    memberWarnings: {
      type: Number,
      default: 0,
    },
    memberBlocks: {
      type: Number,
      default: 0,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true, collection: 'users' },
);

export default UserSchema;
