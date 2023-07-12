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
      required: true,
      default: "",
    },
    dataSize: {
      type: String,
      required: true,
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
      required: true,
      default: "",
    },
    publisher: {
      type: String,
      required: true,
      default: "",
    },
    hasPolicy: {
      type: [String],
      required: true,
      default: [],
    },
    offeredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Participant", // Reference the Participant model
        required: true,
        default: [],
      },
    ],
    accrualPeriodicity: {
      type: String,
      required: true,
      default: "",
    },
    businessModel: {
      type: String,
      required: true,
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

const DataOffering = model<IDataOffering>("DataOffering", dataOfferingSchema);

export default DataOffering;
