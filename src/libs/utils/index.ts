import mongoose from 'mongoose';
export const castIntoMongoObjectId = (target: any) => {
  return typeof target === 'string'
    ? new mongoose.Types.ObjectId(target)
    : target;
};

export const TOKEN_TTL = '30d';
