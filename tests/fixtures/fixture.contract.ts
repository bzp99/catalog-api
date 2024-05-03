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
      console.log(e);
      return [500, { error: "Internal Server Error" }];
    }
  });

  mock.onPut(`${contractUrl}/policies/${contractId}`).reply((config) => {
    console.log("mock put contract..............");
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
      console.log(e);
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
      console.log(e);
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

export const mockContract = () => {
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
  let contract = {};

  const contractUrl = "http://localhost:8888/contracts";
  const contractId = "50726f6d6574686575732d58";

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
      console.log(e);
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
