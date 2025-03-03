import axios from "axios";
import { CONFIG } from "../../config/environment";
import { getContractServiceHeaders } from "./utils";

interface BilateralContractGenerationOptions {
  /**
   * DID identifier of the data provider
   */
  dataProvider: string;

  /**
   * DID identifier of the service provider / data consumer
   */
  dataConsumer: string;

  /**
   * The service offering ID concerned by the contract
   */
  serviceOffering: string;
}

interface EcosystemContractOptions {
  /**
   * Resolvable URL of the Self-Description of the ecosystem
   */
  ecosystem: string;

  /**
   * DID identifier of the ecosystem orchestrator
   */
  orchestrator: string;
}

export const generateBilateralContract = async (
  options: BilateralContractGenerationOptions
) => {
  const res = await axios({
    url: CONFIG.contractServiceEndpoint + "/bilaterals",
    method: "POST",
    headers: getContractServiceHeaders(),
    data: {
      contract: {
        dataProvider: options.dataProvider,
        dataConsumer: options.dataConsumer,
        serviceOffering: options.serviceOffering,
      },
    },
  });
  return res.data;
};

export const generateEcosystemContract = async (
  options: EcosystemContractOptions
) => {
  const res = await axios({
    url: CONFIG.contractServiceEndpoint + "/contracts",
    method: "POST",
    headers: getContractServiceHeaders(),
    data: {
      contract: {
        ecosystem: options.ecosystem,
        orchestrator: options.orchestrator,
      },
    },
  });
  return res.data;
};
