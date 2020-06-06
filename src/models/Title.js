import { Schema, model } from 'mongoose';

const titleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mortgage: {
    type: String,
    required: true,
  },
  squareMeter: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default model('Title', titleSchema);
