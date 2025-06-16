import { Schema } from 'mongoose';
const RestaurantSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
    openingTime: {
      type: Number,
      required: true,
    },
    closingTime: {
      type: Number,
      required: true,
    },
    breakTime: [Number],
  },
  { timestamps: true, collection: 'restaurants' },
);

export default RestaurantSchema;
