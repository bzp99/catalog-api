import { Schema, model } from "mongoose";
import { IDataOffering } from "../../types/models";

const dataOfferingSchema = new Schema<IDataOffering>(
  {
    title: {
      type: String,
      required: true,
    },
    dataType: {
      type: String,
      default: "",
    },
    dataSize: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    identifier: {
      type: String,
      required: true,
      default: "",
    },
    license: {
      type: String,
      default: "",
    },
    publisher: {
      type: String,
      default: "",
    },
    hasPolicy: {
      type: [String],
      default: [],
    },
    offeredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
      },
    ],
    accrualPeriodicity: {
      type: String,
      default: "",
    },
    businessModel: {
      type: String,
      default: "",
    },
    landingPage: {
      type: String,
      default: "",
    },
    theme: { type: String, default: "" },
    keyword: [{ type: String }],
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

dataOfferingSchema.index({ theme: "text", keyword: "text" });

const DataOffering = model<IDataOffering>("DataOffering", dataOfferingSchema);

export default DataOffering;
