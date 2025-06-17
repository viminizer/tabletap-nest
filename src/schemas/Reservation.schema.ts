import { Schema } from 'mongoose';
import { EReservationStatus } from '../libs/enums';

const ReservationSchema = new Schema(
  {
    status: {
      type: String,
      enum: EReservationStatus,
      default: EReservationStatus.PENDING,
    },
    userId: {
      type: Schema.Types.ObjectId,
      requied: true,
      ref: 'User',
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },
    tableId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Table',
    },
    date: Date,
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    specialRequest: {
      type: String,
    },
  },
  { timestamps: true, collection: 'reservations' },
);

export default ReservationSchema;
