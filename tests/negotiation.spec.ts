import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Application } from "express";
import { 
  testParticipantOrganizationAdmin,
  testProvider,
  testConsumer
 } from "./testAccount";

import {
  sampleDataResource,
  sampleSoftwareResource,
  sampleEcosystem,
  sampleServiceOffering,
  sampleBilateralNegotiation,
} from "./sampleData";

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let providerId: string;
let consumerId: string;

before(async () => {
  // Start the server and obtain the app and server instances
  const serverInstance = await startServer(3001);
  app = serverInstance.app;
  server = serverInstance.server;

  //create provider
  const providerData = testProvider;
  const providerResponse = await request(app)
    .post("/v1/auth/signup")
    .send(providerData)
    providerId = providerResponse.body.participant._id;
  //create consumer
  const consumerData = testConsumer;
  const consumerResponse = await request(app)
    .post("/v1/auth/signup")
    .send(consumerData)
    consumerId = consumerResponse.body.participant._id;
  //create Data resources
  //DP creates dataresources

  //SP creates service resources
  
  //create Service Offerings
  //DP
  //SP
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});

let participantId = "";
let jwt = "";
let serviceOfferingId = "";
let negotiationId;

describe("Bilateral Negotiation Routes Tests", () => {

  it("data provider Create a service offering access request", async () => {
    //login DP
    const negotiationData = sampleBilateralNegotiation;

    const response = await request(app)
      .post("/v1/negotiation")
      .send(negotiationData)
      .expect(200);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("signatures");
    expect(response.body.signatures).to.have.property("consumer");
    expect(response.body.signatures).to.have.property("provider");
    expect(response.body.signatures.consumer).to.be.null;
    expect(response.body.signatures.provider).to.be.null;

    expect(response.body).to.have.property("negotiationStatus", "Negotiation");

    expect(response.body)
      .to.have.property("latestNegotiator")
      .and.to.equal(response.body.provider);

    negotiationId = response.body._id;
  });

  it("Service provider can accept negotiation", async () => {
    //login SP
    const response = await request(app)
      .put(`/v1/negotiation/${negotiationId}/accept`)
      .expect(200);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property(
      "negotiationStatus",
      "SignatureReady"
    );
  });
});
