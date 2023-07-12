import Joi from "joi";

export const ecosystemCreationSchema = Joi.object({
  name: Joi.string().required(),
  purposeAndGoals: Joi.object({
    keyPurpose: Joi.string().default(""),
    principles: Joi.array().items(Joi.string()).default([]),
    useCases: Joi.array().items(Joi.string()).default([]),
  }).required(),
  rolesAndResponsibilities: Joi.object({
    stakeholders: Joi.array()
      .items(
        Joi.object({
          organisation: Joi.string().required(),
          role: Joi.string().required(),
          dataOfferings: Joi.array().items(Joi.string()).default([]),
          serviceOfferings: Joi.array().items(Joi.string()).default([]),
        })
      )
      .default([]),
  }).required(),
  businessLogic: Joi.object({
    businessModel: Joi.string().default(""),
    payingParties: Joi.object({
      direction: Joi.array().items(Joi.string()).default([]),
      payers: Joi.array().items(Joi.string()).default([]),
    }),
    businessCase: Joi.object({
      definition: Joi.string().default(""),
    }),
    ecosystemSharing: Joi.object({
      role: Joi.string().default(""),
      valueSharing: Joi.object({
        businessModel: Joi.string().default(""),
        valueNetwork: Joi.object({
          direction: Joi.string().default(""),
        }),
        payers: Joi.array().items(Joi.string()).default([]),
      }),
      revenueModel: Joi.object({
        businessModel: Joi.array().items(Joi.string()).default([]),
        payingParties: Joi.object({
          direction: Joi.array().items(Joi.string()).default([]),
          payers: Joi.array().items(Joi.string()).default([]),
        }),
      }),
      benefits: Joi.array().items(Joi.string()).default([]),
      costs: Joi.array().items(Joi.string()).default([]),
    }),
  }),
  dataValue: Joi.object({
    pricingModel: Joi.string().default(""),
    dataValueSolution: Joi.object({
      provider: Joi.string().required(),
      offering: Joi.string().required(),
      buildingBlock: Joi.string().default(""),
    }),
    dataNetworkSolutions: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().valid("buy", "rent", "build"),
          pays: Joi.array().items(Joi.string()).default([]),
        })
      )
      .required(),
    levelOfCommitment: Joi.array().items(Joi.string()).default([]),
  }),
  governance: Joi.object({
    governancePrinciples: Joi.array().items(Joi.string()).default([]),
    decisionModel: Joi.object({
      perimeter: Joi.string().default(""),
      decisionProcess: Joi.string().default(""),
    }),
  }),
  dataServicesInfrastructure: Joi.object({
    infrastructureServices: Joi.array().items(Joi.string()),
    dataUsageControl: Joi.array().items(Joi.string()),
    consentManagement: Joi.array().items(Joi.string()),
    dataQuality: Joi.array().items(Joi.string()),
    operationalMonitoring: Joi.array().items(Joi.string()),
    issuesQuestions: Joi.string().default(""),
    links: Joi.array().items(Joi.string()),
  }),
  systemDesignAndArchitecture: Joi.object({
    systemPrinciples: Joi.object({
      buildingBlocks: Joi.array().items(Joi.string()).default([]),
      requirements: Joi.array().items(Joi.string()).default([]),
      architecture: Joi.array().items(Joi.string()).default([]),
    }),
    metadataFormats: Joi.array().items(
      Joi.object({
        name: Joi.string().default(""),
        link: Joi.string().default(""),
      })
    ),
  }),
  functionalRequirements: Joi.object({
    technicalInterfaces: Joi.array().items(
      Joi.object({
        name: Joi.string().default(""),
        link: Joi.string().default(""),
        evolutionType: Joi.string().default(""),
      })
    ),
    acIdentities: Joi.array().items(Joi.string()).default([]),
    dataUsageControlSolutions: Joi.array().items(Joi.string()).default([]),
    transactionManagement: Joi.array().items(Joi.string()).default([]),
    dataGovernanceSolution: Joi.array().items(Joi.string()).default([]),
  }),
  informationManagement: Joi.object({
    dataServices: Joi.array().items(Joi.string()),
    dataQuality: Joi.array().items(Joi.string()),
  }),
  security: Joi.object({
    threatAssessment: Joi.object({
      methods: Joi.array().items(Joi.string()).default([]),
      standards: Joi.array().items(Joi.string()).default([]),
      threats: Joi.array().items(Joi.string()).default([]),
      securityObjectives: Joi.array().items(Joi.string()).default([]),
    }),
    riskManagementTools: Joi.array().items(Joi.string()).default([]),
  }),
  privacyAndPersonalData: Joi.object({
    inclusionPersonalData: Joi.boolean(),
    PersonalDataManagementSolution: Joi.array().items(Joi.string()).default([]),
  }),
});

export const ecosystemUpdateSchema = Joi.object({
  name: Joi.string(),
  purposeAndGoals: Joi.object({
    keyPurpose: Joi.string(),
    principles: Joi.array().items(Joi.string()),
    useCases: Joi.array().items(Joi.string()),
  }),
  rolesAndResponsibilities: Joi.object({
    stakeholders: Joi.array().items(
      Joi.object({
        organisation: Joi.string(),
        role: Joi.string(),
        dataOfferings: Joi.array().items(Joi.string()),
        serviceOfferings: Joi.array().items(Joi.string()),
      })
    ),
  }),
  businessLogic: Joi.object({
    businessModel: Joi.string(),
    payingParties: Joi.object({
      direction: Joi.array().items(Joi.string()),
      payers: Joi.array().items(Joi.string()),
    }),
    businessCase: Joi.object({
      definition: Joi.string(),
    }),
    ecosystemSharing: Joi.object({
      role: Joi.string(),
      valueSharing: Joi.object({
        businessModel: Joi.string(),
        valueNetwork: Joi.object({
          direction: Joi.string(),
        }),
        payers: Joi.array().items(Joi.string()),
      }),
      revenueModel: Joi.object({
        businessModel: Joi.array().items(Joi.string()),
        payingParties: Joi.object({
          direction: Joi.array().items(Joi.string()),
          payers: Joi.array().items(Joi.string()),
        }),
      }),
      benefits: Joi.array().items(Joi.string()),
      costs: Joi.array().items(Joi.string()),
    }),
  }),
  dataValue: Joi.object({
    pricingModel: Joi.string(),
    dataValueSolution: Joi.object({
      provider: Joi.string(),
      offering: Joi.string(),
      buildingBlock: Joi.string(),
    }),
    dataNetworkSolutions: Joi.array().items(
      Joi.object({
        type: Joi.string().valid("buy", "rent", "build"),
        pays: Joi.array().items(Joi.string()),
      })
    ),
    levelOfCommitment: Joi.array().items(Joi.string()),
  }),
  governance: Joi.object({
    governancePrinciples: Joi.array().items(Joi.string()),
    decisionModel: Joi.object({
      perimeter: Joi.string(),
      decisionProcess: Joi.string(),
    }),
  }),
  dataServicesInfrastructure: Joi.object({
    infrastructureServices: Joi.array().items(Joi.string()),
    dataUsageControl: Joi.array().items(Joi.string()),
    consentManagement: Joi.array().items(Joi.string()),
    dataQuality: Joi.array().items(Joi.string()),
    operationalMonitoring: Joi.array().items(Joi.string()),
    issuesQuestions: Joi.string(),
    links: Joi.array().items(Joi.string()),
  }),
  systemDesignAndArchitecture: Joi.object({
    systemPrinciples: Joi.object({
      buildingBlocks: Joi.array().items(Joi.string()),
      requirements: Joi.array().items(Joi.string()),
      architecture: Joi.array().items(Joi.string()),
    }),
    metadataFormats: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        link: Joi.string(),
      })
    ),
  }),
  functionalRequirements: Joi.object({
    technicalInterfaces: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        link: Joi.string(),
        evolutionType: Joi.string(),
      })
    ),
    acIdentities: Joi.array().items(Joi.string()),
    dataUsageControlSolutions: Joi.array().items(Joi.string()),
    transactionManagement: Joi.array().items(Joi.string()),
    dataGovernanceSolution: Joi.array().items(Joi.string()),
  }),
  informationManagement: Joi.object({
    dataServices: Joi.array().items(Joi.string()),
    dataQuality: Joi.array().items(Joi.string()),
  }),
  security: Joi.object({
    threatAssessment: Joi.object({
      methods: Joi.array().items(Joi.string()),
      standards: Joi.array().items(Joi.string()),
      threats: Joi.array().items(Joi.string()),
      securityObjectives: Joi.array().items(Joi.string()),
    }),
    riskManagementTools: Joi.array().items(Joi.string()),
  }),
  privacyAndPersonalData: Joi.object({
    inclusionPersonalData: Joi.boolean(),
    PersonalDataManagementSolution: Joi.array().items(Joi.string()),
  }),
});
