import axios from "axios";
import { getBilateralOrEcosystemRoute, getContractServiceHeaders } from "./utils";

type EcosystemContractSignatureOptions = {
  contractId: string;
  participant: string;
  signature: string;
  role?: string;
};

type BilateralContractSignatureOptions = {
  contractId: string;
  signature: {
    did: string;
    party: string;
    value: string;
    date?: Date;
  };
};

export const signContract = async (
  options: EcosystemContractSignatureOptions
) => {
  const { contractId, participant, signature, role } = options;

  const payload = {
    participant: participant,
    signature: signature,
    role: role,
  };

  const res = await axios.put(
    getBilateralOrEcosystemRoute("ecosystem") + "/sign/" + contractId,
    payload,
    { headers: getContractServiceHeaders() }
  );

  return res.data;
};

export const signBilateralContract = async (
  options: BilateralContractSignatureOptions
) => {
  const { contractId, signature } = options;
  const payload = signature;
  const res = await axios.put(
    getBilateralOrEcosystemRoute("bilateral") + "/sign/" + contractId,
    payload,
    { headers: getContractServiceHeaders() }
  );

  return res.data;
};

// /**
//  * ? Q: How do we get the contractID in the catalog interface ?
//  */
// export const revokeContract = async (options: ContractSignatureOptions) => {
//     const { contractId, participant, signature, type } = options;

//     if (type === 'bilateral') {
//         return await revokeBilateralContract(options);
//     } else {
//         return await leaveEcosystem(options);
//     }
// };

// // TODO TBD With contractualisation service
// const revokeBilateralContract = async (options: ContractSignatureOptions) => {
//     throw new Error('Not implemented');
// };

// // TODO
// const leaveEcosystem = async (options: ContractSignatureOptions) => {
//     throw new Error('Not implemented');
// };
