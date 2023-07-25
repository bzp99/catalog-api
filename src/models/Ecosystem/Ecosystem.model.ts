import { Schema, model } from "mongoose";
import { IEcosystem } from "../../types/models";

const ecosystemSchema = new Schema<IEcosystem>(
  {
    name: { type: String, required: true },
    purposeAndGoals: {
      keyPurpose: { type: String, default: "" },
      principles: { type: [String] },
      useCases: { type: [String] },
    },
    rolesAndResponsibilities: {
      stakeholders: [
        {
          organisation: {
            type: Schema.Types.ObjectId,
            ref: "Participant",
            required: true,
          },
          role: { type: String, required: true },
          dataOfferings: [
            {
              type: Schema.Types.ObjectId,
              ref: "DataOffering",
            },
          ],
          serviceOfferings: [
            {
              type: Schema.Types.ObjectId,
              ref: "ServiceOffering",
            },
          ],
        },
      ],
    },
    businessLogic: {
      businessModel: { type: String, default: "" },
      payingParties: {
        direction: { type: [String] },
        payers: { type: [String] },
      },
      businessCase: {
        definition: { type: String, default: "" },
      },
      ecosystemSharing: {
        role: { type: String, default: "" },
        valueSharing: {
          businessModel: { type: String, default: "" },
          valueNetwork: {
            direction: { type: String, default: "" },
          },
          payers: { type: [String] },
        },
        revenueModel: {
          businessModel: [{ type: String }],
          payingParties: {
            direction: [{ type: String }],
            payers: [{ type: String }],
          },
        },
        benefits: [{ type: String }],
        costs: [{ type: String }],
      },
    },
    dataValue: {
      pricingModel: { type: String, default: "" },
      dataValueSolution: {
        provider: {
          type: Schema.Types.ObjectId,
          ref: "Participant",
        },
        offering: {
          type: Schema.Types.ObjectId,
          ref: "Participant",
        },
        buildingBlock: { type: String, default: "" },
      },
      dataNetworkSolutions: [
        {
          type: {
            type: String,
            enum: ["buy", "rent", "build"],
          },
          pays: [
            {
              type: Schema.Types.ObjectId,
              ref: "Participant",
              required: true,
            },
          ],
        },
      ],
      levelOfCommitment: [{ type: String }],
    },
    governance: {
      governancePrinciples: [{ type: String }],
      decisionModel: {
        perimeter: { type: String, default: "" },
        decisionProcess: { type: String, default: "" },
      },
    },
    dataServicesInfrastructure: {
      infrastructureServices: [{ type: String }],
      dataUsageControl: [{ type: String }],
      consentManagement: [{ type: String }],
      dataQuality: [{ type: String }],
      operationalMonitoring: [{ type: String }],
      issuesQuestions: { type: String, default: "" },
      links: [{ type: String }],
    },
    systemDesignAndArchitecture: {
      systemPrinciples: {
        buildingBlocks: [{ type: String }],
        requirements: [{ type: String }],
        architecture: [{ type: String }],
      },
      metadataFormats: [
        {
          name: { type: String, default: "" },
          link: { type: String, default: "" },
        },
      ],
    },
    functionalRequirements: {
      technicalInterfaces: [
        {
          name: { type: String, default: "" },
          link: { type: String, default: "" },
          evolutionType: { type: String, default: "" },
        },
      ],
      acIdentities: [{ type: String }],
      dataUsageControlSolutions: [{ type: String }],
      transactionManagement: [{ type: String }],
      dataGovernanceSolution: [{ type: String }],
    },
    informationManagement: {
      dataServices: [{ type: String }],
      dataQuality: [{ type: String }],
    },
    security: {
      threatAssessment: {
        methods: [{ type: String }],
        standards: [{ type: String }],
        threats: [{ type: String }],
        securityObjectives: [{ type: String }],
      },
      riskManagementTools: [{ type: String }],
    },
    privacyAndPersonalData: {
      inclusionPersonalData: { type: Boolean },
      PersonalDataManagementSolution: [{ type: String }],
    },
    needs: {
      data: [
        {
          keyword: [{ type: String }],
          theme: { type: String },
        },
      ],
      services: [
        {
          keyword: [{ type: String }],
          theme: { type: String },
        },
      ],
    },
    jsonld: {
      type: String,
      required: true,
      default: "",
    },
    schema_version: {
      type: String,
      required: true,
      default: "v0.0.1",
    },
  },
  { timestamps: true }
);

const Ecosystem = model<IEcosystem>("Ecosystem", ecosystemSchema);

export default Ecosystem;
