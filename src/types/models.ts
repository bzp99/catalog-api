import { Types } from "mongoose";

export interface AllSchemas {
  schema_version: string;

  /**
   * JSON-LD Self Description
   */
  jsonld: string;

  createdAt: Date;
  updatedAt: Date;
}

export type FederatedIdentifier = {
  /**
   * MongoDB id
   */
  id: Types.ObjectId | null;

  /**
   * DID identifier, useful to identify the participant
   * if coming from another instance
   */
  identifier: string;
};
