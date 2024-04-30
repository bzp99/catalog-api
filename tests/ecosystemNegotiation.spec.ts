import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Application } from "express";
import { testProvider2, testOrchestrator } from "./testAccount";
import {
  sampleDataResource,
  sampleEcosystem,
  sampleProviderServiceOffering,
  sampleInvitation,
} from "./sampleData";

config();

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let providerId = "";
let orchestId = "";
let dataResourceId = "";
let orchestJwt = "";
let providerJwt = "";
let providerServiceOfferingId = "";
let negotiationId = "";
let ecosystemId = "";

before(async () => {
  // Start the server and obtain the app and server instances
  const serverInstance = await startServer(3002);
  app = serverInstance.app;
  server = serverInstance.server;

  // Create provider
  const providerData = testProvider2;
  const providerResponse = await request(app)
    .post("/v1/auth/signup")
    .send(providerData);
  providerId = providerResponse.body.participant._id;

  // Create orchestrator
  const orchestData = testOrchestrator;
  const orchestResponse = await request(app)
    .post("/v1/auth/signup")
    .send(orchestData);
  orchestId = orchestResponse.body.participant._id;

  // Login provider
  const providerAuthResponse = await request(app)
    .post("/v1/auth/login")
    .send({
      email: testProvider2.email,
      password: testProvider2.password,
    });
  providerJwt = providerAuthResponse.body.token;

  // Login orchestrator
  const orchestAuthResponse = await request(app)
    .post("/v1/auth/login")
    .send({
      email: testOrchestrator.email,
      password: testOrchestrator.password,
    });
  orchestJwt = orchestAuthResponse.body.token;

  // Create data resource
  const dataResourceData = sampleDataResource;
  const dataResponse = await request(app)
    .post("/v1/dataResources")
    .set("Authorization", `Bearer ${providerJwt}`)
    .send(dataResourceData);
  dataResourceId = dataResponse.body._id;

  // Create service offerings
  const resProvider = await request(app)
    .post("/v1/serviceofferings")
    .set("Authorization", `Bearer ${providerJwt}`)
    .send({ ...sampleProviderServiceOffering, providedBy: providerId });
  providerServiceOfferingId = resProvider.body._id;
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});

describe("Ecosystem routes tests", () => {
  it("should create a new ecosystem", async () => {
    const response = await request(app)
      .post("/v1/ecosystems")
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleEcosystem)
      .expect(201);
    ecosystemId = response.body._id;
  });

  it("should getMyEcosystems", async () => {
    const response = await request(app)
      .get("/v1/ecosystems/me")
      .set("Authorization", `Bearer ${orchestJwt}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").and.to.not.be.empty;
  });

  it("should create invitation to join ecosystem", async () => {
    const response = await request(app)
      .post(`/v1/ecosystems/${ecosystemId}/invites`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleInvitation)
      .expect(201);

    expect(response.body.participant).to.equal(providerId);
    expect(response.body.status).to.equal("Requested");
    expect(response.body.latestNegotiator).to.equal(orchestId);
    ecosystemId = response.body._id;
  });

  it("should delete the ecosystem and return the deleted ecosystem", async () => {
    const response = await request(app)
      .delete("/v1/ecosystems/" + ecosystemId)
      .set("Authorization", `Bearer ${orchestJwt}`);

    expect(response.status).to.equal(200);
  });
});
