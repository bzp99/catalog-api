import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
