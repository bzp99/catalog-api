export const sampleDataResource = {
  aggregationOf: ["Resource 1", "Resource 2"],
  name: "Sample Data Resource",
  description: "This is a sample data resource description.",
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key1: "value1" }],
  producedBy: "Producer",
  exposedThrough: ["Endpoint 1", "Endpoint 2"],
  obsoleteDateTime: "2022-12-31",
  expirationDateTime: "2023-12-31",
  containsPII: true,
  category: "Sample Category",
};

export const sampleUpdatedDataResource = {
  aggregationOf: ["Resource 1", "Resource 2", "Resource 3"],
  name: "Sample Updated Data Resource",
  description: "This is an updated data resource description.",
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key1: "value1" }],
  producedBy: "Producer",
  exposedThrough: ["Endpoint 1", "Endpoint 2"],
  obsoleteDateTime: "2022-12-31",
  expirationDateTime: "2024-12-31",
  containsPII: true,
  category: "Sample Category",
};

export const sampleEcosystem = {
  orchestrator: "Sample Orchestrator",
  name: "Sample Ecosystem",
  description: "This is a sample ecosystem description.",
  country_or_region: "Sample Region",
  target_audience: "Sample Audience",
  main_functionalities_needed: ["Functionality 1", "Functionality 2"],
  logo: "sample_logo.jpg",
  useCases: [],
  searchedData: ["Data 1", "Data 2"],
  searchedServices: ["Service 1"],
  provides: ["Data", "Users"],
  contract: "Sample Contract",
  location: "Sample Location",
  businessLogic: {
    businessModel: ["Model 1", "Model 2"],
    roles: [
      {
        businessModels: ["Model 3"],
        benefits: ["Benefit 1"],
        costs: ["Cost 1"],
        payingParties: ["Paying Party 1"],
        role: "Role 5",
      },
    ],
  },
  rolesAndObligations: [
    {
      role: "Role 6",
      ruleId: "Rule 2",
      values: { key2: "value2" },
    },
  ],
  buildingBlocks: [
    {
      buildingBlock: "Block 1",
      implementation: "Implementation 1",
    },
  ],
};

export const sampleEcosystem1 = {
  name: "Sample Ecosystem",
  description: "This is a sample ecosystem description.",  
  provides: ["Data", "Users"],
  searchedData: ["Data 1", "Data 2"],
  searchedServices: ["Service 1"],
  useCases: [],
  businessLogic: {
    businessModel: ["Model 1", "Model 2"],
    roles: [
      {
        businessModels: ["Model 3"],
        benefits: ["Benefit 1"],
        costs: ["Cost 1"],
        payingParties: ["Paying Party 1"],
        role: "Role 5",
      },
    ],
  },
  rolesAndObligations: [
    {
      role: "Role 6",
      ruleId: "Rule 2",
      values: { key2: "value2" },
    },
  ],
};
export const sampleUpdatedEcosystem1 = {
  name: "Updated Ecosystem",
  description: "This is an updated sample ecosystem description.",  
  provides: ["Data", "Users"],
  searchedData: ["Data 1",],
  searchedServices: ["Service 1"],
  useCases: [],
  businessLogic: {
    businessModel: ["Model 1",],
    roles: [
      {
        businessModels: ["Model 3"],
        benefits: ["Benefit 1"],
        costs: ["Cost 1"],
        payingParties: ["Paying Party 1"],
        role: "Role 5",
      },
    ],
  },
  rolesAndObligations: [
    {
      role: "Role 6",
      ruleId: "Rule 2",
      values: { key2: "value3" },
    },
  ],
};

export const sampleInvitation = {
  roles: [
    "data provider"
  ],
  participant: ""
};
export const sampleServiceOffering = {
  name: "<string>",
  providedBy: "<string>",
  aggregationOf: ["<string>", "<string>"],
  dependsOn: ["<string>", "<string>"],
  termsAndConditions: "",
  dataProtectionRegime: ["<string>", "<string>"],
  dataAccountExport: [
    {
      requestType: "webform",
      accessType: "digital",
      formatType: "<string>",
    },
    {
      requestType: "API",
      accessType: "physical",
      formatType: "<string>",
    },
  ],
  policy: [],
  location: "",
  description: "",
  keywords: ["<string>", "<string>"],
  dataResources: [],
  softwareResources: [],
  compliantServiceOfferingVC: "",
  serviceOfferingVC: "",
};
export const sampleProviderServiceOffering = {
  name: "<string>",
  providedBy: "<string>",
  aggregationOf: ["<string>", "<string>"],
  dependsOn: ["<string>", "<string>"],
  termsAndConditions: "",
  dataProtectionRegime: ["<string>", "<string>"],
  dataAccountExport: [
    {
      requestType: "webform",
      accessType: "digital",
      formatType: "<string>",
    },
    {
      requestType: "API",
      accessType: "physical",
      formatType: "<string>",
    },
  ],
  policy: [],
  location: "",
  description: "",
  keywords: ["<string>", "<string>"],
  dataResources: [],
  softwareResources: [],
  compliantServiceOfferingVC: "",
  serviceOfferingVC: "",
};
export const sampleConsumerServiceOffering = {
  name: "<string>",
  providedBy: "<string>",
  aggregationOf: ["<string>", "<string>"],
  dependsOn: ["<string>", "<string>"],
  termsAndConditions: "",
  dataProtectionRegime: ["<string>", "<string>"],
  dataAccountExport: [
    {
      requestType: "webform",
      accessType: "digital",
      formatType: "<string>",
    },
    {
      requestType: "API",
      accessType: "physical",
      formatType: "<string>",
    },
  ],
  policy: [],
  location: "",
  description: "",
  keywords: ["<string>", "<string>"],
  dataResources: [],
  softwareResources: [],
  compliantServiceOfferingVC: "",
  serviceOfferingVC: "",
};

export const sampleUpdatedProviderServiceOffering = {
  name: "<string>",
  providedBy: "<string>",
  aggregationOf: ["<string>", "<string>"],
  dependsOn: ["<string>", "<string>"],
  termsAndConditions: "",
  dataProtectionRegime: ["<string>", "<string>"],
  dataAccountExport: [
    {
      requestType: "webform",
      accessType: "digital",
      formatType: "<string>",
    },
    {
      requestType: "API",
      accessType: "physical",
      formatType: "<string>",
    },
  ],
  policy: [],
  location: "",
  description: "",
  keywords: ["<string>", "<string>"],
  dataResources: [],
  softwareResources: [],
  compliantServiceOfferingVC: "",
  serviceOfferingVC: "",
};
export const sampleUpdatedConsumerServiceOffering = {
  name: "<string>",
  providedBy: "<string>",
  aggregationOf: ["<string>", "<string>"],
  dependsOn: ["<string>", "<string>"],
  termsAndConditions: "",
  dataProtectionRegime: ["<string>", "<string>"],
  dataAccountExport: [
    {
      requestType: "webform",
      accessType: "digital",
      formatType: "<string>",
    },
    {
      requestType: "API",
      accessType: "physical",
      formatType: "<string>",
    },
  ],
  policy: [],
  location: "",
  description: "",
  keywords: ["<string>", "<string>"],
  dataResources: [],
  softwareResources: [],
  compliantServiceOfferingVC: "",
  serviceOfferingVC: "",
};


export const sampleBilateralNegotiation = {
  
  consumer:"",
  provider:"",
  consumerServiceOffering:"",
  providerServiceOffering:"",
};

export const sampleSoftwareResource = {
  aggregationOf: ["Resource 1", "Resource 2"],
  name: "Sample software Resource",
  description: "This is a sample software resource description.",
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key1: "value1" }],
  producedBy: "Producer",
  exposedThrough: ["Endpoint 1", "Endpoint 2"],
  obsoleteDateTime: "2022-12-31",
  expirationDateTime: "2023-12-31",
  containsPII: true,
  category: "Sample Category",
};
export const sampleUpdatedSoftwareResource = {
  aggregationOf: ["Resource 1",],
  name: "Sample software Resource",
  description: "This is an updated software resource description.",
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key1: "value1" }],
  producedBy: "Producer",
  exposedThrough: ["Endpoint 1",],
  obsoleteDateTime: "2022-12-31",
  expirationDateTime: "2023-12-31",
  containsPII: true,
  category: "Sample Category",
};