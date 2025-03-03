import { CONFIG } from "../../config/environment";

export const getBilateralOrEcosystemRoute = (
  type: "bilateral" | "ecosystem"
) => {
  const route = type === "bilateral" ? "bilaterals" : "contracts";
  const url = `${CONFIG.contractServiceEndpoint}/${route}`;
  return url;
};

export const getContractServiceHeaders = () => {
  return {
    "Content-Type": "application/json",
    "x-ptx-catalog-key": process.env.X_PTX_CONTRACT_CATALOG_KEY,
  };
};
