import { CONFIG } from "../../config/environment";

export const getBilateralOrEcosystemRoute = (
  type: "bilateral" | "ecosystem"
) => {
  const route = type === "bilateral" ? "bilaterals" : "contracts";
  const url = `${CONFIG.contractServiceEndpoint}/${route}`;
  return url;
};
