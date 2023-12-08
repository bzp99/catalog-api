import { Schema, Types } from "mongoose";
import {
  IEcosystem,
  IEcosystemModel,
  IEcosystemMethods,
} from "../../types/ecosystem";

export const ecosystemSchema = new Schema<
  IEcosystem,
  IEcosystemModel,
  IEcosystemMethods
>(
  {
    orchestrator: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    country_or_region: { type: String, default: "" },
    target_audience: { type: String, default: "" },
    main_functionalities_needed: [{ type: String }],
    logo: {
      type: String,
      required: false,
      default: "default_ecosystem.jpg",
    },
    useCases: [{ type: Schema.Types.Mixed }],
    joinRequests: [
      {
        participant: { type: String },
        roles: [String],
        valueProposition: { type: String, required: false },
        status: {
          type: String,
          enum: ["Pending", "Authorized", "Rejected", "Signed"],
          default: "Pending",
          required: true,
        },
        createdAt: { type: Date, default: new Date(), required: true },
        updatedAt: { type: Date, default: new Date(), required: true },
      },
    ],
    invitations: [
      {
        participant: { type: String },
        roles: [String],
        valueProposition: { type: String, required: false },
        status: {
          type: String,
          enum: ["Pending", "Authorized", "Rejected", "Signed"],
          default: "Pending",
          required: true,
        },
        createdAt: { type: Date, default: new Date(), required: true },
        updatedAt: { type: Date, default: new Date(), required: true },
      },
    ],
    participants: [
      {
        participant: { type: String },
        roles: [String],
        offerings: [
          {
            serviceOffering: { type: String },
            policy: [
              {
                ruleId: { type: String, required: true },
                values: {
                  type: Schema.Types.Mixed,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
    searchedData: [{ type: String }],
    searchedServices: [{ type: String }],
    provides: [{ type: String }],
    contract: { type: String, default: null },
    location: { type: String, default: "" },
    businessLogic: {
      businessModel: [{ type: String }],
      roles: [
        {
          businessModels: [{ type: String }],
          benefits: [{ type: String }],
          costs: [{ type: String }],
          payingParties: [{ type: String }],
          role: { type: String },
        },
      ],
    },
    rolesAndObligations: [
      {
        role: { type: String },
        ruleId: { type: String },
        values: Schema.Types.Mixed,
      },
    ],
    buildingBlocks: [
      {
        buildingBlock: { type: String },
        implementation: { type: String },
      },
    ],
    schema_version: { type: String, default: "1.1.0" },
  },
  {
    timestamps: true,
    query: {},
  }
);
