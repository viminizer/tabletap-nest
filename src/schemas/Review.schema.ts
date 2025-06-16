import { Schema } from 'mongoose';

const ReviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, collection: 'reviews' },
);

export default ReviewSchema;
