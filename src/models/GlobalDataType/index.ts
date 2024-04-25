import mongoose from "mongoose";
import { globalDataTypeSchema } from "./GlobalDatatype.model";
import {
  IGlobalDataType,
  IGlobalDataTypeModel,
} from "src/types/globaldatatype";

export const GlobalDataType = mongoose.model<
  IGlobalDataType,
  IGlobalDataTypeModel
>("GlobalDataType", globalDataTypeSchema);
