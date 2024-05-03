import mongoose from "mongoose";
import { globalPurposeSchema } from "./GlobalPurpose.model";
import { IGlobalPurpose, IGlobalPurposeModel } from "src/types/globalpurpose";

export const GlobalPurpose = mongoose.model<
  IGlobalPurpose,
  IGlobalPurposeModel
>("GlobalPurpose", globalPurposeSchema);
