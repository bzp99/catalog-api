import mongoose from "mongoose";
import {
  IExchangeConfiguration,
  IExchangeConfigurationModel,
} from "../../types/exchangeconfiguration";
import { exchangeConfigurationSchema } from "./ExchangeConfiguration.model";

import { methods } from "./ExchangeConfiguration.methods";

methods(exchangeConfigurationSchema);

export const ExchangeConfiguration = mongoose.model<
  IExchangeConfiguration,
  IExchangeConfigurationModel
>("ExchangeConfiguration", exchangeConfigurationSchema);
