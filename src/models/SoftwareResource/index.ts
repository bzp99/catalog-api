import mongoose from "mongoose";
import {
  ISoftwareResource,
  ISoftwareResourceModel,
} from "../../types/softwareresource";
import { softwareResourceSchema } from "./SoftwareResource.model";

export const SoftwareResource = mongoose.model<
  ISoftwareResource,
  ISoftwareResourceModel
>("SoftwareResource", softwareResourceSchema);
