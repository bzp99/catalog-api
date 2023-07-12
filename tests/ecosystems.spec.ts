import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";

describe("API Tests", () => {
  let app: Express.Application;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  before((done) => {
    // Start the server and obtain the app and server instances
    const serverInstance = startServer(3001);
    app = serverInstance.app;
    server = serverInstance.server;

    // Wait for the server to start before proceeding
    server.on("listening", () => {
      done();
    });
  });

  after((done) => {
    // Close the server after all tests are completed
    server.close(() => {
      done();
    });
  });

  describe("GET /health", () => {
    it("Should respond with json and a value of OK", async () => {
      const response = await request(app).get("/health");
      expect(response.status).equal(200, "Status should be 200");
      expect(response.body.status).equal("OK", "Value is OK");
    });
  });

  describe("GET /v1/ecosystems/me", () => {
    it("should return a valid response with an array of elements", async () => {
      const response = await request(app).get("/v1/ecosystems/me");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });
});
