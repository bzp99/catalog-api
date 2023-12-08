import { HydratedDocument, Model } from "mongoose";
import { AllSchemas } from "./models";

export type ExchangeConfigurationNegotiationStatus =
  | "Requested"
  | "Authorized"
  | "Negotiation"
  | "SignatureReady"
  | "Signed"
  | "Declined";

export interface IExchangeConfiguration extends AllSchemas {
  /**
   * Participant providing service offering
   */
  provider: string;

  /**
   * Participant consumeing the service offering
   */
  consumer: string;

  /**
   * Service Offering being provided
   */
  providerServiceOffering: string;

  /**
   * Service Offering being provided for the provider's service offering
   */
  consumerServiceOffering: string;

  /**
   * Final provider policies after negotiation that apply to the exchange configuration
   */
  providerPolicies: {
    ruleId: string;
    values: { [requiredField: string]: string | Date | number };
  }[];

  /**
   * Final consumer policies after negotiation that apply to the exchange configuration
   */
  consumerPolicies: {
    ruleId: string;
    values: { [requiredField: string]: string | Date | number };
  }[];

  /**
   * Last negotiator participant ID
   */
  latestNegotiator: string;

  /**
   * Status of the ongoing negotiation for this configuration
   */
  negotiationStatus: ExchangeConfigurationNegotiationStatus;

  /**
   * The signatures of participants before the contract has been generated
   */
  signatures: {
    provider: string | null;
    consumer: string | null;
  };

  /**
   * URI of the contract once it has been signed
   */
  contract: string | null;
}

export type ExchangeConfigurationAccessRequestOptions = {
  provider: string;
  consumer: string;
  providerServiceOffering: string;
  consumerServiceOffering: string;
};

export interface IExchangeConfigurationMethods {
  /**
   * Initiates the request to access the service offering
   * therefore initiates the negotiation process
   */
  request(
    options: ExchangeConfigurationAccessRequestOptions
  ): Promise<HydratedDocument<IExchangeConfiguration>>;

  /**
   * Enables the data provider to accept the negotiation
   */
  authorize(
    providerSignature: string
  ): Promise<HydratedDocument<IExchangeConfiguration>>;
}

export interface IExchangeConfigurationModel
  extends Model<
    IExchangeConfiguration,
    object,
    IExchangeConfigurationMethods
  > {}
