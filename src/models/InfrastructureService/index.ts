import mongoose from "mongoose";
import { infrastructureServiceSchema } from "./InfrastructureService.model";
import {
  IInfrastructureService,
  IInfrastructureServiceModel,
} from "src/types/infrastructureservice";

export const InfrastructureService = mongoose.model<
  IInfrastructureService,
  IInfrastructureServiceModel
>("InfrastructureService", infrastructureServiceSchema);
