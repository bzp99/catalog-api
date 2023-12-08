import { HydratedDocument, Model, Types } from "mongoose";
import { AllSchemas } from "./models";
import { EcosystemParticipantParticipation } from "./participant";

type IEcosystemBuildingBlockImplementation = {
  /**
   * Registry reference URL
   */
  buildingBlock: string;

  /**
   * What implementation is used
   */
  implementation: string;
};

export type OfferingPolicyConfiguration = {
  /**
   * Id of the service offering
   */
  serviceOffering: string;

  /**
   * CONFIGURED policies for this service offering
   * that applies to this ecosystem
   */
  policy: {
    /**
     * uid of the rule in the registry
     */
    ruleId: string;

    /**
     * Values depending on the requested fields of the rule
     */
    values: { [requestedField: string]: string | Date | number };
  }[];
};

export interface IEcosystemJoinRequest {
  /**
   * ID of the participant wanting to join the ecosystem
   */
  participant: string;

  /**
   * Roles the organization has in the ecosystem
   */
  roles: string[];

  /**
   * Value proposition brought by the service to the ecosystem
   * @experimental
   */
  valueProposition?: string;

  /**
   * Status of the request
   * Pending: The request has been created and is waiting on an answer
   * Authorized: The request has been approved by the Orchestrator
   * Rejected: The request has been rejected by the Orchestrator
   * Signed: The request has been approved and the contract was signed
   */
  status: "Pending" | "Authorized" | "Rejected" | "Signed";

  /**
   * When the Join request was created
   */
  createdAt: Date;

  /**
   * When the Join request was last updated
   */
  updatedAt: Date;

  /**
   * Offerings made available by the participant to the ecosystem
   */
  offerings: OfferingPolicyConfiguration[];
}

export interface IEcosystemInvitation {
  /**
   * ID of the participant wanting to join the ecosystem
   */
  participant: string;

  /**
   * Starting roles attributed by the orchestrator for the invited organization
   */
  roles: string[];

  /**
   * Status of the invitation
   * Pending: The invitation has been created and is waiting on an answer
   * Authorized: The invitation has been approved by the Participant
   * Rejected: The invitation has been rejected by the Participant
   * Signed: The invitation has been approved and the contract was signed
   */
  status: "Pending" | "Authorized" | "Rejected" | "Signed";

  /**
   * When the Join request was created
   */
  createdAt: Date;

  /**
   * When the Join request was last updated
   */
  updatedAt: Date;

  /**
   * Offerings made available by the participant to the ecosystem
   */
  offerings: OfferingPolicyConfiguration[];
}

export interface IBusinessLogic {
  /**
   * List of business models that apply to this ecosystem
   * Usually URIs from Prometheus-X reference models
   */
  businessModel: string[];

  /**
   * Business models that apply to a specific role
   */
  roles: {
    /**
     * Role concerned by the business model information
     */
    role: string;

    /**
     * Business models that apply to this role
     */
    businessModels: string[];

    /**
     * Who pays for it
     * Usually URIs from Prometheus-X reference models
     */
    payingParties: string[];

    /**
     * Benefits
     * Usually URIs from Prometheus-X reference models
     */
    benefits: string[];

    /**
     * Costs
     * Usually URIs from Prometheus-X reference models
     */
    costs: string[];
  }[];
}

export interface IEcosystem extends AllSchemas {
  /**
   * The participant orchestrating the ecosystem
   * A URL to the Self-Description of the orchestrator
   */
  orchestrator: string;

  /**
   * Name of the ecosystem
   */
  name: string;

  /**
   * Description of the ecosystem
   */
  description: string;

  /**
   * ISO-3166-1-alpha-2 code for the location of the service offering
   * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  location: string;

  /**
   * Country or region
   * @deprecated use location instead
   */
  country_or_region?: string;

  /**
   * Target audience of the ecosystem
   */
  target_audience?: string;

  /**
   * Main functionalities needed by the ecosystem
   */
  main_functionalities_needed?: string[];

  /**
   * Logo / Image / Icon of the ecosystem
   */
  logo?: string;

  /**
   * Use cases linked to this ecosystem
   */
  useCases: string[];

  /**
   * Requests to join the ecosystem
   */
  joinRequests: Types.DocumentArray<IEcosystemJoinRequest>;

  /**
   * Invitations to join the ecosystem
   */
  invitations: Types.DocumentArray<IEcosystemInvitation>;

  /**
   * Services part of the ecosystems
   */
  participants: {
    /**
     * ID of the participant
     */
    participant: string;
    roles: string[];

    /**
     * Offerings made available by the participant to the ecosystem
     */
    offerings: OfferingPolicyConfiguration[];
  }[];

  /**
   * List of services that the ecosystem wants to use
   */
  searchedServices: string[];

  /**
   * List of datatypes that the ecosystem wants to use
   */
  searchedData: string[];

  /**
   * What the ecosystem provides (users / money / data / services)
   */
  provides: string[];

  /**
   * Roles and obligations that appear in the contract
   * These should not be modified unless a new contract is generated
   */
  rolesAndObligations: {
    /**
     * Role registry reference URL
     */
    role: string;

    /**
     * ID of the rule | registry reference URL of the rule
     */
    ruleId: string;

    /**
     * Values to be injected into the policy
     */
    values: { [key: string]: string };
  }[];

  /**
   * Business logic information of the ecosystem
   */
  businessLogic: IBusinessLogic;

  /**
   * Building blocks selected and their implementation
   */
  buildingBlocks: IEcosystemBuildingBlockImplementation[];

  /**
   * Contract associated to this ecosystem
   */
  contract?: string | null;
}

export type EcosystemInviteMethodOptions = {
  /**
   * The different initial roles the orchestrator is inviting the organization for
   */
  roles: string[];

  /**
   * The partcipant that the orchestrator is inviting
   */
  participant: string;
};

export type EcosystemCancelMethodOptions = {
  /**
   * The participant to cancel the invite for
   */
  participant: string;
};

export type EcosystemAcceptInvitationMethodOptions = {
  /**
   * The participant id accepting the request
   */
  participant: string;

  /**
   * Offerings made available by the participant to the ecosystem
   */
  offerings: OfferingPolicyConfiguration[];
};

export type EcosystemJoinRequestMethodOptions = {
  /**
   * The roles the organization attributed itself for the ecosystem
   */
  roles: string[];

  /**
   * The participant id wanting to join the ecosystem
   */
  participant: string;

  /**
   * Offerings made available by the participant to the ecosystem
   */
  offerings: OfferingPolicyConfiguration[];
};

export type EcosystemAcceptJoinRequestMethodOptions = {
  /**
   * The id of the join request concerned
   */
  joinRequestID: string | Types.ObjectId;

  /**
   * If the orchestrator overrode the roles self-attributed
   * by the participant when creating the join request
   */
  overrideRoles?: string[];
};

export type EcosystemSignJoinRequestMethodOptions = {
  /**
   * The id of the join request concerned
   */
  joinRequestID: string | Types.ObjectId;
};

export interface IEcosystemMethods {
  /**
   * Invites an organization to join an ecosystem
   */
  invite(
    options: EcosystemInviteMethodOptions
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * Cancels an invitation request to an organization
   */
  cancelInvitation(
    options: EcosystemCancelMethodOptions
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * Used by an organization to accept an invitation to an ecosystem
   */
  acceptInvitation(
    options: EcosystemAcceptInvitationMethodOptions
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * Kicks an organization from an ecosystem
   * @param organizationID The organization ID to kick
   * @warning Could have unwanted effects with contracts signatures
   */
  kick(
    organizationID: string | Types.ObjectId
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * An organization making a request to join the ecosystem
   */
  requestToJoin(options: EcosystemJoinRequestMethodOptions): Promise<{
    success: boolean;
    errors: string[];
    joinRequest: IEcosystemJoinRequest;
  }>;

  /**
   * Accepts a request to join the eosystem
   * Returns true on success and false on failure
   * @param joinRequestID The ID of the joinRequest concerned
   */
  acceptJoinRequest(
    options: EcosystemAcceptJoinRequestMethodOptions
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * Refuses a join request from an organization
   * @param joinRequestID	The ID of the joinRequest
   */
  rejectJoinRequest(
    joinRequestID: string | Types.ObjectId
  ): Promise<HydratedDocument<IEcosystem>>;

  /**
   * Allows a participant to sign the ecosystem contract
   * and therefore become a participant of the ecosystem
   */
  signJoinRequest(options: EcosystemSignJoinRequestMethodOptions): Promise<{
    ecosystem: string | Types.ObjectId;
    offerings: EcosystemParticipantParticipation[];
  }>;
}

export interface IEcosystemModel
  extends Model<IEcosystem, object, IEcosystemMethods> {}
