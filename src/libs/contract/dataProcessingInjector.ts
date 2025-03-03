import axios from "axios";
import { getContractServiceHeaders } from "./utils";

export type BatchDataProcessingInjection = {
  _id: string;
  infrastructureServices: {
    participant: string;
    serviceOffering: string;
    params?: { [key: string]: string | number | Date };
    configuration?: string;
  }[];
};

export type DataProcessing = {
  /**
   * The id of the dataProcessing
   */
  _id: string;
  /**
   * The id of the contract to which the policy will be injected
   */
  infrastructureServices: InfrastructureService[];
};

/**
 * Transition from OfferingPolicyConfiguration to the requirements
 * for the contract service
 */
export type InfrastructureService = {
  /**
   * The id of the participant
   */
  participant: string;
  /**
   * The id of the service offering
   */
  serviceOffering: string;
  /**
   * The custom params
   */
  params?: { [key: string]: string | number | Date };

  /**
   * The configuration id from the connector
   */
  configuration?: string;
};

/**
 * Retrieve the data processing of a specific contract
 * @param contractId
 * @constructor
 */
export const GetDataProcessings = async (contractId: string) => {
  const res = await axios({
    url: `${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings`,
    headers: getContractServiceHeaders(),
    method: "GET",
  });
  return res.data;
};

/**
 * Insert multiple data processing into the contract
 * @param contractId
 * @param data
 */
export const batchWriteDataProcessings = async (
  contractId: string,
  data: BatchDataProcessingInjection[]
) => {
  const res = await axios({
    url: `${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings`,
    headers: getContractServiceHeaders(),
    method: "POST",
    data,
  });
  return res.data;
};

/**
 * Insert a specific data processing into the contract
 * @param contractId
 * @param data
 */
export const injectDataProcessingContract = async (
  contractId: string,
  data: BatchDataProcessingInjection
) => {
  const res = await axios({
    url: `${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings/insert`,
    headers: getContractServiceHeaders(),
    method: "PUT",
    data,
  });

  return res.data;
};

/**
 * Update a specific data processing chain in the contract
 * @param contractId
 * @param dataProcessingChainId
 * @param data
 */
export const updateDataProcessingContract = async (
  contractId: string,
  dataProcessingChainId: string,
  data: BatchDataProcessingInjection
) => {
  const res = await axios({
    url: `${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings/update/${dataProcessingChainId}`,
    headers: getContractServiceHeaders(),
    method: "PUT",
    data,
  });

  return res.data;
};

/**
 * Remove a specific data processing chain in the contract, changing is status to inactive
 * @param contractId
 * @param dataProcessingId
 */
export const removeDataProcessingContract = async (
  contractId: string,
  dataProcessingId: string
) => {
  const res = await axios({
    url: `${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings/${dataProcessingId}`,
    headers: getContractServiceHeaders(),
    method: "DELETE",
  });
  return res.data;
};
