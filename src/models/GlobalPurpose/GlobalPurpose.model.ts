import { Schema } from "mongoose";

export const globalPurposeSchema = new Schema({
  category: { type: String, required: true },
  description: { type: String },
});
