import mongoose from 'mongoose'
import { ROLES } from '../enums/roles.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: [ROLES.USER, ROLES.ADMIN, ROLES.GUEST],
    default: ROLES.USER,
  },

}, { timestamps: true });

const user = mongoose.model('user', userSchema);

export default user;
