export class ContractInterconnectionError extends Error {
  error =
    "An error occurred when trying to communicate with the Contractualisation Service";

  constructor(message?: string) {
    super(message);
  }
}
