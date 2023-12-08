import { Schema } from "mongoose";
import {
  IOrganizationAdmin,
  IOrganizationAdminModel,
  IOrganizationAdminMethods,
} from "../../types/organizationadmin";

export const organizationAdminSchema = new Schema<
  IOrganizationAdmin,
  IOrganizationAdminModel,
  IOrganizationAdminMethods
>(
  {
    firstName: { type: String, required: true, max: 20 },
    lastName: { type: String, required: true, max: 25 },
    password: { type: String, required: true, min: 8 },
    email: { type: String, required: true },
    organization: { type: String, required: true },
    roles: [{ type: String }],
    permissions: [{ type: String }],
    schema_version: { type: String, default: "1" },
  },
  {
    timestamps: true,
    query: {},
  }
);
