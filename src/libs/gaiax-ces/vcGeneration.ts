interface gxAddress {
  /**
   * ex: BE-BRU
   */
  "gx:countrySubdivisionCode": string;
}

interface gxLegalRegistrionNumber {
  /**
   * ex: "https://gaia-x.eu/legalRegistrationNumberVC.json"
   */
  id: string;
}

export const generateLegalParticipant = (
  id: string,
  legalName: string,
  legalRegistrationNumber: gxLegalRegistrionNumber,
  headquarterAddress: gxAddress,
  legalAddress: gxAddress,
  issuer: string
) => {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
      "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#",
    ],
    type: ["VerifiableCredential"],
    id: id,
    issuer: issuer,
    issuanceDate: Date.now(),
    credentialSubject: {
      type: "gx:LegalParticipant",
      "gx:legalName": legalName,
      "gx:legalRegistrationNumber": legalRegistrationNumber,
      "gx:headquarterAddress": headquarterAddress,
      "gx:legalAddress": legalAddress,
      id: id,
    },
  };
};

/**
 * TODO Placeholder
 */
export const generateServiceOffering = () => {
  return {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
      "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#",
    ],
    type: "VerifiableCredential",
    id: "",
    issuer: "",
    issuanceDate: "",
    credentialSubject: {
      type: "gx:ServiceOffering",
      "gx:providedBy": {
        id: "https://wizard.lab.gaia-x.eu/api/credentials/2d37wbGvQzbAQ84yRouh2m2vBKkN8s5AfH9Q75HZRCUQmJW7yAVSNKzjJj6gcjE2mDNDUHCichXWdMH3S2c8AaDLm3kXmf5R8DFPWTYo5iRYkn8kvgU3AjMXc2qTbhuMHCpucKGgT1ZMkcHUygZkt11iD3T8VJNKYwsdk4MGoZwdqoFUuTKVcsXVTBA4ofD1Dtqzjavyng5WUpvJf4gRyfGkMvYYuHCgay8TK8Dayt6Rhcs3r2d1gRCg2UV419S9CpWZGwKQNEXdYbaB2eTiNbQ83KMd4mj1oSJgF7LLDZLJtKJbhwLzR3x35QUqEGevRxnRDKoPdHrEZN7r9TVAmvr9rt7Xq8eB4zGMTza59hisEAUaHsmWQNaVDorqFyZgN5bXswMK1irVQ5SVR9osCCRrKUKkntxfakjmSqapPfveMP39vkgTXfEhsfLUZXGwFcpgLpWxWRn1QLnJY11BVymS7DyaSvbSKotNFQxyV6vghfM2Jetw1mLxU5qsQqDYnDYJjPZQSmkwxjX3yenPVCz6N2ox83tj9AuuQrzg5p2iukNdunDd2QCsHaMEtTq9JVLzXtWs2eZbPkxCBEQwoKTGGVhKu5yxZjCtQGc#9894e9b0a38aa105b50bb9f4e7d0975641273416e70f166f4bd9fd1b00dfe81d",
      },
      "gx:policy": "",
      "gx:termsAndConditions": {
        "gx:URL": "http://termsandconds.com",
        "gx:hash": "d8402a23de560f5ab34b22d1a142feb9e13b3143",
      },
      "gx:dataAccountExport": {
        "gx:requestType": "API",
        "gx:accessType": "digital",
        "gx:formatType": "application/json",
      },
      id: "",
    },
  };
};
