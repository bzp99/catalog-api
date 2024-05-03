import { Model } from "mongoose";

export interface IGlobalPurpose {
  category: string;
  description: string;
}

export interface IGlobalPurposeMethods {}

export interface IGlobalPurposeModel
  extends Model<IGlobalPurpose, object, IGlobalPurposeMethods> {}
