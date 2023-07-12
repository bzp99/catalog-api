import { Request } from "express";

export class BadEndpointError extends Error {
  constructor(req: Request) {
    const message = `Invalid Endpoint. Path ${req.path} is unknown`;
    super(message);
  }

  jsonResponse() {
    return {
      code: 404,
      error: "Invalid endpoint",
      message: this.message,
    };
  }
}
