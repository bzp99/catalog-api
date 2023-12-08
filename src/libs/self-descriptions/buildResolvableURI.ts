import { CONFIG } from "../../config/environment";

/**
 * Builds the resolvable URI of the resource pointing to its Self-Description
 * and handles the necessary verifications to modify the URI if it is invalid
 */
export const buildResolvableSelfDescriptionURI = (
  type:
    | "serviceofferings"
    | "dataresources"
    | "participants"
    | "softwareresources"
    | "ecosystems",
  resourceID: string
): string => {
  if (!resourceID) return resourceID;
  if (resourceID.startsWith("https://")) {
    if (resourceID.includes("/catalog/")) {
      return resourceID;
    } else {
      return `${CONFIG.apiUrl}/catalog/${type}/${resourceID}`;
    }
  } else {
    return `${CONFIG.apiUrl}/catalog/${type}/${resourceID}`;
  }
};
