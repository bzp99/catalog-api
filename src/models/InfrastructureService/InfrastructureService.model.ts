import { Schema } from "mongoose";

export const infrastructureServiceSchema = new Schema(
  {
    // Gaia-x
    name: { type: String, required: true },
    providedBy: { type: String },
    aggregationOf: [{ type: String }],
    dependsOn: [{ type: String }],
    policy: [{ type: Schema.Types.Mixed }],
    termsAndConditions: { type: String, default: "" },
    dataProtectionRegime: [{ type: String }],
    dataAccountExport: [
      {
        requestType: {
          type: String,
          enum: [
            "API",
            "email",
            "webform",
            "unregisteredLetter",
            "registeredLetter",
            "supportCenter",
          ],
        },
        accessType: {
          type: String,
          enum: ["digital", "physical"],
        },
        formatType: { type: String },
      },
    ],

    // Visions defined
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    detailedDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    keywords: [String],
    dataResources: [{ type: Schema.Types.ObjectId, ref: "DataResource" }],
    softwareResources: [
      { type: Schema.Types.ObjectId, ref: "SoftwareResource" },
    ],

    // Specific parameters for infrastructure service
    params: { type: String, default: "" },

    // Input/Output parameters
    inputFormat: { type: String, default: "" },
    outputFormat: { type: String, default: "" },

    // Visions specific
    archived: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    pricing: { type: Number, default: 0 },
    pricingModel: [{ type: String, default: "" }],
    businessModel: [{ type: String, default: "" }],
    maximumConsumption: { type: String, default: "" },
    maximumPerformance: { type: String, default: "" },
    pricingDescription: { type: String, default: "" },
    b2cDescription: [{ type: Schema.Types.Mixed }],
    purpose: { type: String, default: "" },
    userInteraction: { type: Boolean },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    currency: { type: String, default: "" },
    billingPeriod: { type: String, default: "" },
    costPerAPICall: { type: Number, default: 0 },
    setupFee: { type: Number, default: 0 },

    // Gaia-x federation
    compliantServiceOfferingVC: { type: String, default: "" },
    serviceOfferingVC: { type: String, default: "" },

    category: [{ type: String }],

    schema_version: { type: String, default: "1.2.0" },
  },
  {
    timestamps: true,
    query: {},
  }
);
