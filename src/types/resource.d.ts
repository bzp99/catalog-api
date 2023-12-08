/**
 * A resource that may be aggregated in a Service Offering or exist independently of it.
 */
export interface Resource {
  /**
   * resources related to the resource and that can exist independently of it.
   *
   * @specification Gaia-x
   */
  aggregationOf: string[];

  /**
   * A human readable name of the data resource
   *
   * @specification Gaia-x
   */
  name: string;

  /**
   * A free text description of the data resource
   *
   * @specification Gaia-x
   */
  description: string;
}
