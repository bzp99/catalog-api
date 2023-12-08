import { Schema } from "mongoose";
import {
  IExchangeConfiguration,
  IExchangeConfigurationModel,
  IExchangeConfigurationMethods,
} from "../../types/exchangeconfiguration";

export const exchangeConfigurationSchema = new Schema<
  IExchangeConfiguration,
  IExchangeConfigurationModel,
  IExchangeConfigurationMethods
>(
  {
    consumer: { type: String, required: true },
    provider: { type: String, required: true },
    consumerServiceOffering: { type: String, required: true },
    providerServiceOffering: { type: String, required: true },
    providerPolicies: [
      {
        ruleId: { type: String, required: true },
        values: { type: Schema.Types.Mixed },
      },
    ],
    consumerPolicies: [
      {
        ruleId: { type: String, required: true },
        values: { type: Schema.Types.Mixed },
      },
    ],
    latestNegotiator: { type: String, default: "" },
    signatures: {
      consumer: { type: String, default: null },
      provider: { type: String, default: null },
    },
    contract: { type: String, default: null },
    negotiationStatus: { type: String },
    schema_version: { type: String, default: "1" },
  },
  {
    timestamps: true,
    query: {},
  }
);
