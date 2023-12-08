import mongoose from "mongoose";
import { IEcosystem, IEcosystemModel } from "../../types/ecosystem";
import { ecosystemSchema } from "./Ecosystem.model";
import { methods } from "./Ecosystem.methods";

methods(ecosystemSchema);

export const Ecosystem = mongoose.model<IEcosystem, IEcosystemModel>(
  "Ecosystem",
  ecosystemSchema
);
