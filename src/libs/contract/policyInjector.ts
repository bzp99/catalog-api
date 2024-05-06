import axios from "axios";
import { CONFIG } from "../../config/environment";

type BatchRoleAndObligationInjection = {
  contractId: string;
  rolesAndObligations: {
    role: string;
    ruleId: string;
    values: { [key: string]: string | number | Date };
  }[];
};

type BilateralPolicyInjectionOptions = {
  /**
   * The policy uid from the registry
   */
  policyId: string;

  /**
   * The id of the contract to which the policy will be injected
   */
  contractId: string;

  /**
   * The values that should be injected in the policy
   * for the "requestedFields"
   */
  values: { [key: string]: string | Date | number };
};

export type BilateralPolicyBatchInjectionOptions = {
  /**
   * The id of the contract to which the policy will be injected
   */
  contractId: string;

  rules: {
    /**
     * The rule uid from the registry
     */
    ruleId: string;

    /**
     * The values that should be injected in the policy
     * for the "requestedFields"
     */
    values: { [key: string]: string | Date | number };
  }[];
};

export const batchInjectRoleAndObligations = async (
  options: BatchRoleAndObligationInjection
) => {
  const res = await axios({
    url:
      CONFIG.contractServiceEndpoint +
      "/contracts/policies/" +
      options.contractId,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: options.rolesAndObligations,
  });
  return res.data;
};

export const injectPolicyInBilateralContract = async (
  options: BilateralPolicyInjectionOptions
) => {
  const res = await axios({
    url:
      CONFIG.contractServiceEndpoint +
      "/contracts/policy/" +
      options.contractId,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: options,
  });

  return res.data;
};

export const batchInjectPoliciesInBilateralContract = async (
  options: BilateralPolicyBatchInjectionOptions
) => {
  const res = await axios({
    url:
      CONFIG.contractServiceEndpoint +
      "/bilaterals/policies/" +
      options.contractId,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: options.rules,
  });

  return res.data;
};
