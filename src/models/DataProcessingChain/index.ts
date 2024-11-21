import mongoose from "mongoose";
import { dataProcessingChainSchema } from "./DataProcessingChain.model";
import {
  IDataProcessingChain,
  IDataProcessingChainModel,
} from "src/types/dataprocessingchain";

export const DataProcessingChain = mongoose.model<
  IDataProcessingChain,
  IDataProcessingChainModel
>("DataProcessingChain", dataProcessingChainSchema);
