import { Types } from "mongoose";
import { IParticipant } from "../types/participant";
import { IDataResource } from "../types/dataresource";
import { ISoftwareResource } from "../types/softwareresource";

type MongooseDoc<T> = T & {
  _id: Types.ObjectId;
  id: string;
};

export type ServiceOfferingPopulationType = {
  providedBy: IParticipant;
  dataResources: MongooseDoc<IDataResource>[];
  softwareResources: MongooseDoc<ISoftwareResource>[];
};

export const serviceOfferingPopulation = [
  {
    path: "providedBy",
    model: "Participant",
  },
  {
    path: "dataResources",
    model: "DataResource",
  },
  {
    path: "softwareResources",
    model: "SoftwareResource",
  },
];

export const notificationPopulation = [
  {
    path: "notifier",
    model: "Participant",
  },
  {
    path: "notified",
    model: "Participant",
  },
  {
    path: "serviceOffering",
    model: "ServiceOffering",
  },
  {
    path: "ecosystem",
    model: "Ecosystem",
  },
];

export const exchangeConfigurationPopulation = [
  {
    path: "provider",
    model: "Participant",
  },
  {
    path: "consumer",
    model: "Participant",
  },
  {
    path: "providerServiceOffering",
    model: "ServiceOffering",
  },
  {
    path: "consumerServiceOffering",
    model: "ServiceOffering",
  },
];
