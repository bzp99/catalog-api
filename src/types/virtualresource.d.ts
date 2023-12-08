import { Resource } from "./resource";

/**
 * A Virtual resource is a resource describing recorded information such as, and
 * not limited to, a dataset, a software, a configuration file, an AI model.
 * Special subclasses of Virtual Resource are SoftwareResource and DataResource.
 */
export interface VirtualResource extends Resource {
  /**
   * A list of copyright owners either as a free form string or participant URIs
   * from which Self-Descriptions can be retrieved. A copyright owner is a person
   * or organization that has the right to exploit the resource. Copyright owner
   * does not necessarily refer to the author of the resource, who is a natural
   * person and may differ from copyright owner.
   *
   * @specification Gaia-x
   */
  copyrightOwnedBy: string[];

  /**
   * A list of SPDX identifiers or URL to document
   * refers to the license of the virtual resource - data or software, not the license of potential instance of that virtual resource.
   * https://github.com/spdx/license-list-data/tree/main/jsonld
   *
   * @specification Gaia-x
   */
  license: string[];

  /**
   * A list of policy expressed using ODRL
   * (access control, throttling, usage, retention,...)
   *
   * If there is no specified usage policy constraints on the VirtualResource, the policy should express a simple default: allow intent.
   *
   * @specification Gaia-x
   */
  policy: any[];
}
