import { Model } from "mongoose";
import { IServiceOffering } from "./serviceoffering";

export interface IInfrastructureService extends IServiceOffering {
  /**
   * Stringified JSON object containing the parameters for the configuration of the infrastructure service
   */
  params: string;

  /**
   *  Stringified JSON object of the expected input format
   */
  inputFormat: string;

  /**
   *  Stringified JSON object of the expected output format
   */
  outputFormat: string;
}

export interface IInfrastructureServiceMethods {}

export interface IInfrastructureServiceModel
  extends Model<
    IInfrastructureService,
    object,
    IInfrastructureServiceMethods
  > {}
