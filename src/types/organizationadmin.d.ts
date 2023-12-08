import { Model } from "mongoose";
import { AllSchemas } from "./models";

export interface IOrganizationAdmin extends AllSchemas {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  /**
   * ID of the participant
   */
  organization: string;
  roles: string[];
  permissions: string[];
}

export interface IOrganizationAdminMethods {
  /**
   * Generates a hash for the inputed password
   * @todo Should be async
   */
  hashPassword(password: string): string;

  /**
   * Validates the service password
   * @todo Should be async
   */
  isPasswordValid(password: string): boolean;
}

export interface IOrganizationAdminModel
  extends Model<IOrganizationAdmin, object, IOrganizationAdminMethods> {}
