import { Schema } from "mongoose";

export const globalDataTypeSchema = new Schema({
  category: { type: String, required: true },
  description: { type: String },
});
