import { Model } from "mongoose";

export interface IGlobalDataType {
  category: string;
  description: string;
}

export interface IGlobalDataTypeMethods {}

export interface IGlobalDataTypeModel
  extends Model<IGlobalDataType, object, IGlobalDataTypeMethods> {}
