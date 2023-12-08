import axios from "axios";
import { ContractInterconnectionError } from "./errors";
import { getBilateralOrEcosystemRoute } from "./utils";

interface ContractFilterOptions {
  type: "bilateral" | "ecosystem";
  filter?: "signed" | "unsigned";
  as?: "dataConsumer" | "dataProvider";
}

export const getContractById = async (
  id: string,
  type: "bilateral" | "ecosystem"
) => {
  const url = `${getBilateralOrEcosystemRoute(type)}/${id}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new ContractInterconnectionError();
  }
};

export const getParticipantContracts = async (
  filterOptions: ContractFilterOptions
) => {
  const queryFilter = `?filter=${filterOptions.filter}&as=${filterOptions.as}`;
  const url = `${getBilateralOrEcosystemRoute(
    filterOptions.type
  )}${queryFilter}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new ContractInterconnectionError();
  }
};
