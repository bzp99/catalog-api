import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const mockBilateralContract = () => {
  const mock = new MockAdapter(axios);
  const date = new Date().toISOString();
  const contractBase = {
    status: "pending",
    createdAt: date,
    updatedAt: date,
    policy: [],
  };
  let contract: any = {};

  const contractUrl = "http://localhost:8888/bilaterals";
  const contractId = "50726f6d6574686575732d59";

  mock.onPost(`${contractUrl}`).reply((config) => {
    try {
      const data = JSON.parse(config.data);
      const { ...rest } = data.contract;
      contract = {
        ...contractBase,
        ...rest,
        _id: contractId,
      };
      return [200, contract];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${contractUrl}/policies/${contractId}`).reply((config) => {
    try {
      const injections = JSON.parse(config.data);
      for (const injection of injections) {
        const { ruleId } = injection;
        contract.policy.push({
          ruleId,
          description: "mock-rule",
          permission: [],
          prohibition: [],
        });
      }
      return [200, { contract }];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${contractUrl}/sign/${contractId}`).reply((config) => {
    try {
      const inputSignature = JSON.parse(config.data);
      if (!contract.signatures) {
        contract.signatures = [];
      }
      const existingSignature = contract.signatures.find(
        (signature) => signature.party === inputSignature.party
      );
      if (existingSignature) {
        existingSignature.value = inputSignature.value;
      } else {
        contract.signatures.push(inputSignature);
      }
      if (contract.signatures.length === 2) {
        contract.status = "signed";
      }
      return [200, { contract }];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onGet(`${contractUrl}/${contractId}`).reply(200, {
    ...contract,
    _id: contractId,
  });

  mock
    .onDelete(`${contractUrl}/${contractId}`)
    .reply(200, { message: "Contract deleted successfully." });
};

export const mockContract = (contr?: string, dpId?: string) => {
  const mock = new MockAdapter(axios);
  const date = new Date().toISOString();
  const contractBase = {
    rolesAndObligations: [],
    status: "pending",
    serviceOfferings: [],
    purpose: [],
    members: [],
    revokedMembers: [],
    createdAt: date,
    updatedAt: date,
  };
  let contract: any = {};

  const contractUrl = "http://localhost:8888/contracts";
  const contractId = contr ?? "50726f6d6574686575732d58";
  const dataProcessingChainId = dpId ?? "50726f6d6574686575732d58";

  mock.onPost(`${contractUrl}`).reply((config) => {
    try {
      const data = JSON.parse(config.data);
      const { permission = [], prohibition = [], ...rest } = data.contract;
      const rolesAndObligations = data.role
        ? [
            {
              role: data.role,
              policies: [
                {
                  permission,
                  prohibition,
                },
              ],
            },
          ]
        : [];
      contract = {
        ...contractBase,
        ...rolesAndObligations,
        ...rest,
        _id: contractId,
      };
      return [200, contract];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${contractUrl}/policies/${contractId}`).reply((config) => {
    try {
      const injections = JSON.parse(config.data);
      for (const injection of injections) {
        const { role } = injection;
        let roleIndex = contract.rolesAndObligations.findIndex(
          (entry) => entry.role === role
        );
        if (roleIndex === -1) {
          contract.rolesAndObligations.push({
            role,
            policies: [],
          });
          roleIndex = contract.rolesAndObligations.length - 1;
        }
        const roleEntry = contract.rolesAndObligations[roleIndex];
        roleEntry.policies.push({
          description: "mock-description",
          permission: [],
          prohibition: [],
        });
      }
      return [200, { contract }];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${contractUrl}/sign/${contractId}`).reply((config) => {
    try {
      const injections = JSON.parse(config.data);
      const { participant, signature } = injections;
      const existingMember = contract.members.find(
        (member) => member.participant === participant
      );
      if (existingMember) {
        existingMember.signature = signature;
      } else {
        contract.members.push({
          participant,
          signature,
        });
      }
      const orchestratorSignature = contract.members.find(
        (member) => member.role === "orchestrator"
      );
      if (
        contract.members.length >= 2 &&
        orchestratorSignature &&
        orchestratorSignature.signature
      ) {
        contract.status = "signed";
      }
      return [200, { contract }];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onGet(`${contractUrl}/${contractId}`).reply(200, {
    ...contract,
    _id: contractId,
  });

  mock
    .onDelete(`${contractUrl}/${contractId}`)
    .reply(200, { message: "Contract deleted successfully." });

  mock.onPut(`${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings/insert`).reply((config) => {
    try {
      return [200, {message: "ok"}];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${process.env.CONTRACT_SERVICE_ENDPOINT}/contracts/${contractId}/processings/update/${dataProcessingChainId}`).reply((config) => {
    try {
      return [200, {message: "ok"}];
    } catch (e) {
      return [500, { error: "Internal Server Error" }];
    }
  });
};
