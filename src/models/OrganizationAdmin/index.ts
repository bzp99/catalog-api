import mongoose from "mongoose";
import {
  IOrganizationAdmin,
  IOrganizationAdminModel,
} from "../../types/organizationadmin";
import { organizationAdminSchema } from "./OrganizationAdmin.model";
import { methods } from "./OrganizationAdmin.methods";

methods(organizationAdminSchema);

export const OrganizationAdmin = mongoose.model<
  IOrganizationAdmin,
  IOrganizationAdminModel
>("OrganizationAdmin", organizationAdminSchema);
