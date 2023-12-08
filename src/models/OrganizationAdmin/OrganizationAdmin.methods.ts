import { Schema } from "mongoose";
import {
  IOrganizationAdmin,
  IOrganizationAdminModel,
  IOrganizationAdminMethods,
} from "../../types/organizationadmin";
import bcrypt from "bcrypt";

export const methods = (
  schema: Schema<
    IOrganizationAdmin,
    IOrganizationAdminModel,
    IOrganizationAdminMethods
  >
) => {
  schema.methods.hashPassword = function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  schema.methods.isPasswordValid = function (password: string) {
    return bcrypt.compareSync(password, this.password);
  };
};
