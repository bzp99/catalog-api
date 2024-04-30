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

export const sampleSoftwareResource = {
  providedBy: "Consumer Name",
  name: "Sample Software Resource",
  description: "This is a sample software resource description.",
  aggregationOf: ["Resource 1", "Resource 2"],
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key1: "value1" }],
  category: "Sample Category",
  locationAddress: [{ countryCode: "US" }],
  users_clients: 100,
  demo_link: "https://demo.example.com",
  relevant_project_link: "https://project.example.com",
};
export const sampleUpdatedSoftwareResource = {
  providedBy: "Updated Consumer Name",
  name: "Updated Software Resource",
  description: "This is an updated software resource description.",
  aggregationOf: ["Resource 1", "Resource 2","Resources 3"],
  copyrightOwnedBy: ["Owner 1", "Owner 2"],
  license: ["License 1"],
  policy: [{ key2: "value2" }],
  category: "Sample Category",
  locationAddress: [{ countryCode: "US" }],
  users_clients: 100,
  demo_link: "https://demo.example.com",
  relevant_project_link: "https://project.example.com",
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

export const sampleUpdatedServiceOfferings = {
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