import { Schema, Types } from "mongoose";
import {
  IEcosystem,
  IEcosystemModel,
  IEcosystemMethods,
  IEcosystemJoinRequest,
  EcosystemInviteMethodOptions,
  EcosystemCancelMethodOptions,
  EcosystemAcceptInvitationMethodOptions,
  EcosystemJoinRequestMethodOptions,
  EcosystemAcceptJoinRequestMethodOptions,
  EcosystemSignJoinRequestMethodOptions,
} from "../../types/ecosystem";
import { EcosystemParticipantParticipation } from "src/types/participant";

export const methods = (
  schema: Schema<IEcosystem, IEcosystemModel, IEcosystemMethods>
) => {
  schema.methods.invite = async function ({
    roles,
    participant,
  }: EcosystemInviteMethodOptions) {
    const existingInvitation = this.invitations.find(
      (inv: any) => inv.participant.toString() === participant.toString()
    );

    if (existingInvitation) return this as any;

    if (
      participant === this.orchestrator ||
      participant === this.orchestrator?._id?.toString()
    )
      throw new Error("Cannot create invitation for the orchestrator");

    this.invitations.push({
      participant,
      roles,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "Pending",
    });

    await this.save();
    return this;
  };

  schema.methods.cancelInvitation = async function ({
    participant,
  }: EcosystemCancelMethodOptions) {
    const idx = this.invitations.findIndex((inv: any) => {
      return inv.participant.toString() === participant.toString();
    });

    if (idx === -1) return this as any;

    this.invitations.splice(idx, 1);
    await this.save();
    return this;
  };

  schema.methods.acceptInvitation = async function ({
    participant,
    offerings,
  }: EcosystemAcceptInvitationMethodOptions) {
    const idx = this.invitations.findIndex(
      (inv: any) => inv.participant.toString() === participant
    );

    if (idx === -1) throw new Error("Invalid invitation");

    this.invitations[idx].status = "Authorized";
    this.invitations[idx].offerings = offerings;

    await this.save();
    return this as any;
  };

  schema.methods.requestToJoin = async function ({
    participant,
    roles,
    offerings,
  }: EcosystemJoinRequestMethodOptions) {
    const existingRequestIdx = this.joinRequests.findIndex(
      (req: any) => req.participant === participant
    );

    if (existingRequestIdx !== -1) {
      return {
        success: false,
        errors: ["Participant has an existing invitation for this ecosystem"],
        joinRequest: this.joinRequests[
          existingRequestIdx
        ] as IEcosystemJoinRequest,
      };
    }

    const newJoinRequest: IEcosystemJoinRequest = {
      participant,
      roles,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      offerings: offerings || [],
    };

    this.joinRequests.push(newJoinRequest);

    await this.save();

    return {
      success: true,
      errors: [],
      joinRequest: newJoinRequest,
    };
  };

  schema.methods.acceptJoinRequest = async function ({
    joinRequestID,
    overrideRoles,
  }: EcosystemAcceptJoinRequestMethodOptions) {
    const idx = this.joinRequests.findIndex(
      (req: Types.Subdocument<IEcosystemJoinRequest>) =>
        req._id?.toString() === joinRequestID.toString()
    );

    if (idx === -1) return this as any;

    if (this.joinRequests[idx].status === "Authorized") return this;

    this.joinRequests[idx].status = "Authorized";
    this.joinRequests[idx].roles =
      overrideRoles || this.joinRequests[idx].roles;

    await this.save();

    return this;
  };

  schema.methods.signJoinRequest = async function ({
    joinRequestID,
  }: EcosystemSignJoinRequestMethodOptions) {
    const idx = this.joinRequests.findIndex(
      (req: Types.Subdocument<IEcosystemJoinRequest>) =>
        req._id?.toString() === joinRequestID.toString()
    );

    if (idx === -1) return this as any;

    if (this.joinRequests[idx].status === "Signed") return this;

    this.joinRequests[idx].status = "Signed";

    this.participants.push({
      organization: this.joinRequests[idx].organization,
      participant: this.joinRequests[idx].participant,
      roles: this.joinRequests[idx].roles,
    });

    await this.save();

    return {
      ecosystem: this._id,
      offerings: [],
    } as EcosystemParticipantParticipation;
  };

  schema.methods.rejectJoinRequest = async function (
    joinRequestID: string | Types.ObjectId
  ) {
    const idx = this.joinRequests.findIndex(
      (req: Types.Subdocument<IEcosystemJoinRequest>) =>
        req._id?.toString() === joinRequestID
    );
    if (idx === -1) return this as any;

    this.joinRequests[idx].status = "Rejected";
    await this.save();
    return this;
  };

  schema.methods.kick = async function (
    organizationID: string | Types.ObjectId
  ) {
    const idx = this.participants?.findIndex(
      (par: { organization: Types.ObjectId; roles: string[] }) =>
        par.organization?.toString() === organizationID.toString()
    );

    if (idx === -1 || !idx) return this as any;

    const joinRequest = this.joinRequests.findIndex(
      (req: any) => req.organization?.toString() === organizationID.toString()
    );

    const invite = this.invitations.findIndex(
      (inv: any) => inv.organization?.toString() === organizationID.toString()
    );

    if (joinRequest !== -1) this.joinRequests.splice(joinRequest, 1);
    if (invite !== -1) this.invitations.splice(invite, 1);

    await this.save();
    return this;
  };
};
