import mongoose from "mongoose";
import { IDataResource, IDataResourceModel } from "../../types/dataresource";
import { dataResourceSchema } from "./DataResource.model";

export const DataResource = mongoose.model<IDataResource, IDataResourceModel>(
  "DataResource",
  dataResourceSchema
);
