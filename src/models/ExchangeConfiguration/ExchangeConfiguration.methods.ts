import { Schema } from "mongoose";
import {
  IExchangeConfiguration,
  IExchangeConfigurationModel,
  IExchangeConfigurationMethods,
  ExchangeConfigurationAccessRequestOptions,
} from "../../types/exchangeconfiguration";

export const methods = (
  schema: Schema<
    IExchangeConfiguration,
    IExchangeConfigurationModel,
    IExchangeConfigurationMethods
  >
) => {
  schema.methods.request = async function (
    options: ExchangeConfigurationAccessRequestOptions
  ) {
    const {
      consumer,
      consumerServiceOffering,
      provider,
      providerServiceOffering,
    } = options;
    this.consumer = consumer;
    this.consumerServiceOffering = consumerServiceOffering;
    this.provider = provider;
    this.providerServiceOffering = providerServiceOffering;
    this.negotiationStatus = "Requested";
    this.contract = null;

    await this.save();

    return this as any;
  };

  schema.methods.authorize = async function (providerSignature: string) {
    this.negotiationStatus = "Authorized";
    this.signatures.provider = providerSignature;
    await this.save();
    return this as any;
  };
};
