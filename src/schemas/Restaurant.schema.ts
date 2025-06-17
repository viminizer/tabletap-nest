import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ERestaurantStatus } from '../libs/enums';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true, collection: 'restaurants' })
export class Restaurant {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  ownerId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    enum: ERestaurantStatus,
    default: ERestaurantStatus.ACTIVE,
  })
  status: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, trim: true })
  address: string;

  @Prop({
    required: true,
    match: /^\+?[0-9]{7,15}$/,
  })
  phone: string;

  @Prop({
    match: /.+@.+\..+/,
  })
  email?: string;

  @Prop({
    required: true,
    min: 0,
    max: 2359,
  })
  openingTime: number;

  @Prop({
    required: true,
    min: 0,
    max: 2359,
  })
  closingTime: number;

  @Prop({
    type: [Number],
    default: [],
    validate: {
      validator: function (v: number[]) {
        return v.length === 0 || (v.length === 2 && v[0] < v[1]);
      },
      message: 'Break time must be an array of two numbers [start, end]',
    },
  })
  breakTime: number[];

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
    },
  })
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;

  @Prop({
    type: Number,
    default: 0,
  })
  views: number;
}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
RestaurantSchema.index({ name: 1, address: 1 }, { unique: true });

RestaurantSchema.pre('save', function (next) {
  const doc = this as RestaurantDocument;
  if (doc.openingTime >= doc.closingTime) {
    return next(new Error('Opening time must be before closing time'));
  }
  if (
    doc.breakTime?.length === 2 &&
    (doc.breakTime[0] < doc.openingTime || doc.breakTime[1] > doc.closingTime)
  ) {
    return next(
      new Error('Break time must be within opening and closing times'),
    );
  }
  next();
});

export default RestaurantSchema;
