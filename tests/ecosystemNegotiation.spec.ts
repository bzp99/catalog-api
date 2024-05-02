import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Application } from "express";
import { testProvider2, testOrchestrator } from "./fixtures/testAccount";
import {
  sampleDataResource,
  sampleEcosystem,
  sampleUpdatedEcosystem,
  sampleProviderServiceOffering,
  sampleOfferings,
  sampleInvitation,
} from "./fixtures/sampleData";

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
  await serverInstance.promise;

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
  const providerAuthResponse = await request(app).post("/v1/auth/login").send({
    email: testProvider2.email,
    password: testProvider2.password,
  });
  providerJwt = providerAuthResponse.body.token;

  // Login orchestrator
  const orchestAuthResponse = await request(app).post("/v1/auth/login").send({
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

  it("should update an ecosystem", async () => {
    const response = await request(app)
      .put(`/v1/ecosystems/${ecosystemId}`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleUpdatedEcosystem)
      .expect(200);
    ecosystemId = response.body._id;
  });

  it("should getMyEcosystems", async () => {
    const response = await request(app)
      .get("/v1/ecosystems/me")
      .set("Authorization", `Bearer ${orchestJwt}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").and.to.not.be.empty;
  });
  it("should apply Orchestrator Signature", async () => {
    const response = await request(app)
      .put(`/v1/ecosystems/${ecosystemId}/signature/orchestrator`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send({
        signature: "hasSigned",
      })
      .expect(200);
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
  it("should get All Invitations for a participant", async () => {
    const response = await request(app)
      .get("/v1/ecosystems/me/invites")
      .set("Authorization", `Bearer ${providerJwt}`)
      .expect(200);
    expect(response.body).to.be.an("array").and.to.not.be.empty;
  });
  it("should get all pending invitations for an orchestrator of ecosystem", async () => {
    const response = await request(app)
      .get("/v1/ecosystems/invites")
      .set("Authorization", `Bearer ${orchestJwt}`)
      .expect(200);
    expect(response.body).to.be.an("array").and.to.not.be.empty;
  });

  it("should accept invitation to join ecosystem", async () => {
    const response = await request(app)
      .post(`/v1/ecosystems/${ecosystemId}/invites/accept`)
      .set("Authorization", `Bearer ${providerJwt}`)
      .expect(200);
  });

  it("should configure Participant Ecosystem Offerings", async () => {
    const response = await request(app)
      .put(`/v1/ecosystems/${ecosystemId}/offerings`)
      .set("Authorization", `Bearer ${providerJwt}`)
      .send(sampleOfferings)
      .expect(200);
  });

  it("should apply Participant Signature", async () => {
    const response = await request(app)
      .put(`/v1/ecosystems/${ecosystemId}/signature/participant`)
      .set("Authorization", `Bearer ${providerJwt}`)
      .send({
        signature: "hasSigned",
      })
      .expect(200);
  });

  it("should delete the ecosystem and return the deleted ecosystem", async () => {
    const response = await request(app)
      .delete("/v1/ecosystems/" + ecosystemId)
      .set("Authorization", `Bearer ${orchestJwt}`);

    expect(response.status).to.equal(200);
  });
});
