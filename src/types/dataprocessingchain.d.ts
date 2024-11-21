import { Model } from "mongoose";

export interface IInfrastructureServicesDataProccessingChainDefinition {
  /**
   * ID of the participant who owns the infrastructure service
   */
  participant: string;

  /**
   * ID of the service offering provided
   */
  serviceOffering: string;

  /**
   * Stringified JSON of parameters
   */
  params?: string;

  /**
   * Stringified JSON of configuration
   */
  configuration?: string;
}

export interface IDataProcessingChain {
  /**
   * List of infrastructure services used by the data processing chain
   */
  infrastructureServices: IInfrastructureServicesDataProccessingChainDefinition[];
}

export interface IDataProcessingChainMethods {}

export interface IDataProcessingChainModel
  extends Model<IDataProcessingChain, object, IDataProcessingChainMethods> {}
