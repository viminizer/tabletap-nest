import { Schema } from 'mongoose';

const TableSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },
    tableNumber: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    tableDesc: String,
  },
  { timestamps: true, collection: 'tables' },
);

export default TableSchema;
