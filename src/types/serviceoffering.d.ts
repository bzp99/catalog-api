import { Model } from "mongoose";
import { AllSchemas } from "./models";

export type PersonalDataProtectionRegimes =
  | "GDPR2016"
  | "LGPD2019"
  | "PDPA2012"
  | "CCPA2018"
  | "VCDPA2021";

interface IServiceOfferingExtension {
  description: string;
  keywords: string[];
  archived: boolean;
  visible: boolean;
  serviceOfferingVC: string;
  compliantServiceOfferingVC?: string;

  /**
   * System ObjectIDs of the aggregated data resources to facilitate query
   */
  dataResources: string[];

  /**
   * System ObjectIDs of the aggregated software resources to facilitate query
   */
  softwareResources: string[];
}

/**
 * Gaia-x valid schema for a Service Offering
 * The Service Offering is defined by Gaia-x here: https://docs.gaia-x.eu/policy-rules-committee/trust-framework/latest/service/
 */
export interface IServiceOffering
  extends AllSchemas,
    IServiceOfferingExtension {
  /**
   * A human readable name of the component
   */
  name: string;

  /**
   * A resolvable link to the participant self-description providing the service
   */
  providedBy: string;

  /**
   * A resolvable link to the resources self-description related to the service
   * and that can exist independently of it.
   */
  aggregationOf: string[];

  /**
   * a resolvable link to the service offering self-description related to the service
   * and that can exist independently of it.
   */
  dependsOn: string[];

  /**
   * A list of policy expressed using a ODRL
   */
  policy: any[];

  /**
   * A resolvable link to the Terms and Conditions applying to that service.
   */
  termsAndConditions: string;

  /**
   * A list of data protection regime from the list available at https://docs.gaia-x.eu/policy-rules-committee/trust-framework/latest/service/
   */
  dataProtectionRegime: PersonalDataProtectionRegimes[];

  /**
   * List of methods to export data from your user’s account out of the service
   */
  dataAccountExport: {
    /**
     * The mean to request data retrieval
     */
    requestType:
      | "API"
      | "email"
      | "webform"
      | "unregisteredLetter"
      | "registeredLetter"
      | "supportCenter";

    /**
     * Type of data support
     */
    accessType: "digital" | "physical";

    /**
     * type of Media Types (formerly known as MIME types) as defined by the IANA.
     * https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    formatType: string;
  }[];

  /**
   * ISO-3166-1-alpha-2 code for the location of the service offering
   * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  location: string;
}

export interface IServiceOfferingMethods {}

export interface IServiceOfferingModel
  extends Model<IServiceOffering, object, IServiceOfferingMethods> {}
