import { IEcosystem, IParticipant } from "../types/models";

/**
 * Generates a JSON-LD for the ecosystem based on the schema
 */
export const ecosystemToSelfDescription = (
  e: IEcosystem & {
    rolesAndResponsibilities: { stakeholders: IParticipant };

    dataValue: {
      dataValueSolution: { provider: IParticipant; offering: IParticipant };
      dataNetworkSolutions: {
        pays: IParticipant[];
      }[];
    };
  }
) => {
  const jsonLd = {
    "@context": {
      schema: "https://schema.org/",
      xsd: "http://www.w3.org/2001/XMLSchema#",
      did: "https://www.w3.org/ns/did#",
      gaia: "https://gaia-x.eu/ontology#",
    },
    "@type": "ecosystem",
    name: e.name,
    purposeAndGoals: {
      keyPurpose: {
        "@type": "xsd:string",
        "@value": e.purposeAndGoals.keyPurpose || "",
      },
      principles: e.purposeAndGoals.principles || [],
      useCases: e.purposeAndGoals.useCases || [],
    },
    rolesAndResponsibilities: {
      stakeholders: e.rolesAndResponsibilities.stakeholders.map(
        (stakeholder) => {
          const organization = {
            "@type": "schema:Organization",
            "@id": stakeholder.organisation,
            "schema:name": stakeholder.organisation,
            "did:identifier": stakeholder.organisation,
          };

          return {
            organisation: organization,
            role: stakeholder.role,
            dataOfferings: stakeholder.dataOfferings || [],
            serviceOfferings: stakeholder.serviceOfferings || [],
          };
        }
      ),
    },
    businessLogic: {
      businessModel: e.businessLogic.businessModel,
      payingParties: {
        direction: e.businessLogic.payingParties.direction || [],
        payers: e.businessLogic.payingParties.payers || [],
      },
      businessCase: {
        definition: e.businessLogic.businessCase.definition || "",
        ecosystemSharing: {
          role: e.businessLogic.ecosystemSharing.role,
          valueSharing: {
            businessModel:
              e.businessLogic.ecosystemSharing.valueSharing.businessModel,
            valueNetwork: {
              direction:
                e.businessLogic.ecosystemSharing.valueSharing.valueNetwork
                  .direction,
            },
            payers: e.businessLogic.ecosystemSharing.valueSharing.payers || [],
          },
        },
        revenueModel: {
          businessModel:
            e.businessLogic.ecosystemSharing.revenueModel.businessModel || [],
          payingParties: {
            direction:
              e.businessLogic.ecosystemSharing.revenueModel.payingParties
                .direction || [],
            payers:
              e.businessLogic.ecosystemSharing.revenueModel.payingParties
                .payers || [],
          },
        },
        benefits: e.businessLogic.ecosystemSharing.benefits || [],
        costs: e.businessLogic.ecosystemSharing.costs || [],
      },
    },
    dataValue: {
      pricingModel: e.dataValue.pricingModel,
      dataValueSolution: {
        provider: {
          "@type": "schema:Organization",
          "@id": e.dataValue.dataValueSolution.provider._id,
          "schema:name":
            e.dataValue.dataValueSolution.provider.hasLegallyBindingName,
          "did:identifier": e.dataValue.dataValueSolution.provider.id,
        },
        offering: {
          "@type": "schema:Organization",
          "@id": e.dataValue.dataValueSolution.offering._id,
          "schema:name":
            e.dataValue.dataValueSolution.offering.hasLegallyBindingName,
          "did:identifier": e.dataValue.dataValueSolution.offering.id,
        },
        buildingBlock: e.dataValue.dataValueSolution.buildingBlock || "",
      },
      dataNetworkSolutions: e.dataValue.dataNetworkSolutions.map((dn) => {
        return {
          "@context": {
            typeEnum: ["buy", "rent", "build"],
          },
          type: {
            "@type": "typeEnum",
            "@value": e.dataValue.dataNetworkSolutions.type,
          },
          pays: dn.pays.map((payer) => {
            return {
              "@type": "schema:Organization",
              "@id": payer._id,
              "schema:name": payer.hasLegallyBindingName,
              "did:identifier": payer.id,
            };
          }),
        };
      }),
      levelOfCommitment: e.dataValue.levelOfCommitment || [],
    },
    governance: {
      governancePrinciples: e.governance.governancePrinciples || [],
      decisionModel: {
        perimeter: e.governance.decisionModel.perimeter || "",
        decisionProcess: e.governance.decisionModel.decisionProcess || "",
      },
    },
    dataServicesInfrastructure: {
      infrastructureServices:
        e.dataServicesInfrastructure.infrastructureServices || [],
      dataUsageControl: e.dataServicesInfrastructure.dataUsageControl || [],
      consentManagement: e.dataServicesInfrastructure.consentManagement || [],
      dataQuality: e.dataServicesInfrastructure.dataQuality || [],
      operationalMonitoring:
        e.dataServicesInfrastructure.operationalMonitoring || [],
      issuesQuestions: e.dataServicesInfrastructure.issuesQuestions || "",
      links: e.dataServicesInfrastructure.links || [],
    },
    systemDesignAndArchitecture: {
      systemPrinciples: {
        buildingBlocks:
          e.systemDesignAndArchitecture.systemPrinciples.buildingBlocks || [],
        requirements:
          e.systemDesignAndArchitecture.systemPrinciples.requirements || [],
        architecture:
          e.systemDesignAndArchitecture.systemPrinciples.architecture || [],
      },
      metadataFormats:
        e.systemDesignAndArchitecture.metadataFormats || ([] as object[]),
    },
    functionalRequirements: {
      technicalInterfaces: e.functionalRequirements.technicalInterfaces.map(
        (i) => {
          return {
            name: i.name || "",
            link: i.link || "",
            evolutionType: i.evolutionType || "",
          };
        }
      ),
      acIdentities: e.functionalRequirements.acIdentities || [],
      dataUsageControlSolutions:
        e.functionalRequirements.dataUsageControlSolutions || [],
      transactionManagement:
        e.functionalRequirements.transactionManagement || [],
      dataGovernanceSolution:
        e.functionalRequirements.dataGovernanceSolution || [],
    },
    informationManagement: {
      dataServices: e.informationManagement.dataServices || [],
      dataQuality: e.informationManagement.dataQuality || [],
    },
    security: {
      threatAssessment: {
        methods: e.security.threatAssessment.methods || [],
        standards: e.security.threatAssessment.standards || [],
        threats: e.security.threatAssessment.threats || [],
        securityObjectives:
          e.security.threatAssessment.securityObjectives || [],
      },
      riskManagementTools: e.security.riskManagementTools || [],
    },
    privacyAndPersonalData: {
      inclusionPersonalData: e.privacyAndPersonalData.inclusionPersonalData,
      PersonalDataManagementSolution:
        e.privacyAndPersonalData.PersonalDataManagementSolution || [],
    },
  };

  return JSON.stringify(jsonLd, null, 2);
};

/**
 * Generates a JSON-LD for the participant based on the example
 */
export const participantToSelfDescription = (p: IParticipant) => {
  const jsonLd = {
    "@context": {
      sh: "http://www.w3.org/ns/shacl#",
      schema: "http://www.w3.org/2001/XMLSchema#",
      xsd: "http://www.w3.org/2001/XMLSchema#",
      "gax-core": "http://w3id.org/gaia-x/core#",
      "gax-participant": "http://w3id.org/gaia-x/participant#",
      dcat: "http://www.w3.org/ns/dcat#",
      dcterms: "http://purl.org/dc/terms/",
      did: "https://www.w3.org/TR/did-core/#",
    },
    "@id": p.id,
    "@type": "Participant",
    "did:identifier": p.identifier,
    "gax-participant:hasLegallyBindingName": p.hasLegallyBindingName,
    address: {
      "@type": "schema:PostalAddress",
      "schema:addressLocality": p.address.addressLocality,
      "schema:addressRegion": p.address.addressRegion,
      "schema:postalCode": p.address.postalCode,
      "schema:streetAddress": p.address.streetAddress,
    },
    url: {
      "@type": "xsd:anyURI",
      "@value": p.url,
    },
    description: {
      "@type": "xsd:string",
      "@value": p.description,
    },
    "gax-participant:hasBusinessIdentifier": p.hasBusinessIdentifier,
    "gax-participant:hasLogo": {
      "@value": p.hasLogo,
      "@type": "xsd:anyURI",
    },
    "gax-participant:hasMemberParticipant": p.hasMemberParticipant.map(
      (member) => {
        return {
          "@id": member.id,
          "did:identifier": member.id,
        };
      }
    ),
    contactPoint: p.contactPoint.map((contact) => {
      return {
        "@type": "schema:ContactPoint",
        "schema:email": contact.email,
        "schema:telephone": contact.telephone,
        "schema:contactType": contact.contactType,
      };
    }),
    "gax-participant:hasCompanyType": p.hasCompanyType,
    "gax-participant:hasPhoneNumber": p.hasPhoneNumber,
    "gax-participant:hasMemberPerson": p.hasMemberPerson.map((person) => {
      return {
        "@type": "schema:Person",
        "schema:name": person.name,
      };
    }),
    email: p.email,
  };

  return JSON.stringify(jsonLd, null, 2);
};
