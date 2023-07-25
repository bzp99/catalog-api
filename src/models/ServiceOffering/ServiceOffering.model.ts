import { Schema, model } from "mongoose";
import { IServiceOffering } from "../../types/models";

const serviceOfferingSchema = new Schema<IServiceOffering>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    landingPage: {
      type: String,
      required: true,
      default: "",
    },
    distribution: {
      type: [String],
      required: true,
      default: [],
    },
    accrualPeriodicity: {
      type: String,
      required: true,
      default: "",
    },
    subject: {
      type: String,
      required: true,
      default: "",
    },
    spatial: {
      type: String,
      required: true,
      default: "",
    },
    theme: { type: String, default: "" },
    keyword: [{ type: String }],
    temporalResolution: {
      type: String,
      required: true,
      default: "",
    },
    businessModel: {
      type: String,
      required: true,
      default: "",
    },
    offeredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
      },
    ],
    license: {
      type: String,
      default: "",
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

serviceOfferingSchema.index({ theme: "text", keyword: "text" });

const ServiceOffering = model<IServiceOffering>(
  "ServiceOffering",
  serviceOfferingSchema
);

export default ServiceOffering;
