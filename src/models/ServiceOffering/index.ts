import mongoose from "mongoose";
import {
  IServiceOffering,
  IServiceOfferingModel,
} from "../../types/serviceoffering";
import { serviceOfferingSchema } from "./ServiceOffering.model";

export const ServiceOffering = mongoose.model<
  IServiceOffering,
  IServiceOfferingModel
>("ServiceOffering", serviceOfferingSchema);
