import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
   
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('User', UserSchema);
