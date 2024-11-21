import { Schema } from "mongoose";

export const dataProcessingChainSchema = new Schema({
  infrastructureServices: [
    {
      id: {
        type: String,
        required: true,
      },
    },
  ],
});
