import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  title: { type: Schema.Types.ObjectId, ref: 'Title' },
  oldOwner: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default model('Transaction', transactionSchema);
