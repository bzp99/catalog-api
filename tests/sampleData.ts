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

export const sampleSoftwareResource = {
  providedBy: "Provider Name",
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

export const sampleServiceOffering = {
  name: "Sample Service Offering",
  providedBy: "Provider Name",
  aggregationOf: ["Resource 1", "Resource 2"],
  dependsOn: ["Dependency 1", "Dependency 2"],
  policy: {
    key1: "value1",
    key2: "value2",
  },
  termsAndConditions: "Sample terms and conditions",
  dataProtectionRegime: ["Regime 1", "Regime 2"],
  dataAccountExport: [
    {
      requestType: "API",
      accessType: "digital",
      formatType: "JSON",
    },
    {
      requestType: "email",
      accessType: "physical",
      formatType: "PDF",
    },
  ],
  location: "Sample Location",
  description: "Sample service offering description",
  keywords: ["Keyword 1", "Keyword 2"],
  dataResources: ["Resource ID 1", "Resource ID 2"],
  softwareResources: ["Software ID 1", "Software ID 2"],
  compliantServiceOfferingVC: "Compliant VC",
  serviceOfferingVC: "Service VC",
};