import mongoose from 'mongoose';

/**
 * User Schema for storing user details
 */
const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique user ID
  first_name: { type: String, required: true }, // First name of the user
  last_name: { type: String, required: true }, // Last name of the user
  birthday: { type: Date, required: true }, // Birth date of the user
  marital_status: { type: String, required: true }, // Marital status of the user
});

export const User = mongoose.model('User', userSchema);