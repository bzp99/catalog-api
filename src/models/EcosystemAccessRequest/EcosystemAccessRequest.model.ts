import { Schema, model } from "mongoose";
import {
  FederatedIdentifier,
  IEcosystemAccessRequest,
  IEcosystemAccessRequestModel,
} from "../../types/models";

const schema = new Schema<IEcosystemAccessRequest>(
  {
    ecosystem: {
      id: { type: Schema.Types.ObjectId, ref: "Ecosystem" },
      identifier: { type: String },
    },
    status: { type: String, enum: ["PENDING", "AUTHORIZED", "REVOKED"] },
    joining: {
      id: { type: Schema.Types.ObjectId, ref: "Participant" },
      identifier: { type: String, required: true },
      role: { type: String, required: true },
    },
    isInvitation: { type: Boolean, required: true },
    initiatedBy: {
      id: { type: Schema.Types.ObjectId, ref: "Participant" },
      identifier: { type: String },
    },
    authorizedBy: {
      id: { type: Schema.Types.ObjectId, ref: "Participant" },
      identifier: { type: String },
    },
    revokedBy: {
      id: { type: Schema.Types.ObjectId, ref: "Participant" },
      identifier: { type: String },
    },
    accessionAgreementSignature: { type: String, default: "" },
  },
  { timestamps: true }
);

schema.statics.invite = async function (
  participant: FederatedIdentifier & { role: string },
  ecosystem: FederatedIdentifier,
  initiator: FederatedIdentifier
) {
  const ar = new this({
    ecosystem,
    joining: participant,
    initiatedBy: initiator,
    authorizedBy: initiator,
    isInvitation: true,
    status: "PENDING",
    revokedBy: null,
    accessionAgreementSignature: null,
  });

  await ar.save();
  return ar;
};

schema.statics.request = async function (
  participant: FederatedIdentifier & { role: string },
  ecosystem: FederatedIdentifier
) {
  const ar = new this({
    ecosystem,
    joining: participant,
    initiatedBy: participant,
    isInvitation: false,
    status: "PENDING",
    authorizedBy: null,
    revokedBy: null,
    accessionAgreementSignature: null,
  });

  await ar.save();
  return ar;
};

schema.statics.findAccessRequestsByEcosystem = function (
  id: string,
  identifier: string
) {
  return this.find({
    $or: [{ "ecosystem.id": id }, { "ecosystem.identifier": identifier }],
  });
};

const EcosystemAccessRequest = model<
  IEcosystemAccessRequest,
  IEcosystemAccessRequestModel
>("EcosystemAccessRequest", schema);

export default EcosystemAccessRequest;
