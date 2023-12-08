import axios from "axios";

/**
 * Gets terms and conditions for specified version or a list of available versions when no version is specified.
 */
export const getTermsAndConditions = async () => {
  const res = await axios.get(
    "https://registry.gaia-x.eu/v1/api/termsAndConditions"
  );
  return res.data;
};
