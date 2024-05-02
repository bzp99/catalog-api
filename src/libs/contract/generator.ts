import axios from "axios";
import { CONFIG } from "../../config/environment";

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

export const authorizeExchangeConfiguration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { policy } = req.body;

    const exchangeConf = await ExchangeConfiguration.findById(id);

    if (!exchangeConf) {
      return res.status(404).json({
        code: 404,
        errorMsg: "Resource not found",
        message: "Exchange Configuration could not be found",
      });
    }

    if (exchangeConf.provider.toString() !== req.user.id.toString()) {
      return res.status(400).json({
        code: 400,
        errorMsg: "Resource error",
        message: "Exchange Configuration could not be authorized",
      });
    }

    if (exchangeConf.negotiationStatus === "Authorized") {
      return res.status(400).json({
        code: 400,
        errorMsg: "Invalid operation",
        message: "Exchange configuration has already been authorized",
      });
    }

    if (getDocumentId(exchangeConf.provider) !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized operation" });
    }

    try {
      const contract = await generateBilateralContract({
        dataConsumer: exchangeConf.consumer,
        dataProvider: exchangeConf.provider,
        serviceOffering: exchangeConf.providerServiceOffering,
      });

      if (!contract)
        throw new Error("Contract was not returned by Contract Service");

      exchangeConf.contract = contract._id;
    } catch (err) {
      return res
        .status(409)
        .json({ error: "Failed to generate contract: " + err.message });
    }

    exchangeConf.providerPolicies = policy;
    exchangeConf.negotiationStatus = "Authorized";
    await exchangeConf.save();

    return res.status(200).json(exchangeConf);
  } catch (err) {
    next(err);
  }
};

export const generateEcosystemContract = async (
  options: EcosystemContractOptions
) => {
  const res = await axios({
    url: CONFIG.contractServiceEndpoint + "/contracts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      contract: {
        ecosystem: options.ecosystem,
        orchestrator: options.orchestrator,
      },
    },
  });
  return res.data;
};
