/// The Gaia-X notarization API let's us generate an unsigned VC by providing a registrationNumber (vatID, taxID, EUID, EORI or leiCode) to be checked by the API

import axios from "axios";

/**
 *
 * @param vcid The participant ID in a DID format
 * @param registrationNumber The registration number in one of the following formats: vatID, taxID, EUID, EORI or leiCode
 * @param registrationNumberType vatID, taxID, EUID, EORI or leiCode
 */
export const getRegistrationNumberVC = async (
  vcid: string,
  registrationNumber: string,
  registrationNumberType: "vatID" | "taxID" | "EUID" | "EORI" | "leiCode"
) => {
  const payload = {
    "@context": [
      "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/participant",
    ],
    type: "gx:legalRegistrationNumber",
    id: vcid,
    [`gx:${registrationNumberType}`]: registrationNumber,
  };

  const res = await axios.post(
    `https://registrationnumber.notary.gaia-x.eu/v1/registrationNumberVC?vcid=${encodeURIComponent(
      vcid
    )}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
