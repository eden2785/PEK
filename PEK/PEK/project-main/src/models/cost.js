import { Schema, model } from 'mongoose';

/**
 * Cost Schema for storing expense details
 */
const costSchema = new Schema(
  {
    description: { type: String, required: true }, // Description of the cost
    category: { 
      type: String, 
      required: true, 
      enum: ['food', 'health', 'housing', 'sport', 'education'], 
      message: 'Invalid category' // Ensuring category is within the predefined list
    },
    userid: { type: Number, required: true }, // Reference to the user ID
    sum: { type: Number, required: true, min: 0 }, // Amount spent
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

export const Cost = model('Cost', costSchema);
