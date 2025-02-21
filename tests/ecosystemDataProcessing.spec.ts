import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Application } from "express";
import { mockContract } from "./fixtures/fixture.contract";

import {
  testProvider6,
  infra,
  testOrchestrator2,
  testConsumer5,
} from "./fixtures/testAccount";
import {
  sampleDataResource,
  sampleSoftwareResource,
  sampleProviderServiceOffering,
  sampleConsumerServiceOffering,
  sampleEcosystem,
  sampleInvitation,
  sampleOfferings,
  sampleProviderInfrastructureService,
} from "./fixtures/sampleData";
import { stub } from "sinon";
import * as loadMongoose from "../src/config/database";
import { closeMongoMemory, openMongoMemory } from "./utils.ts/mongoMemory";

config();

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let provider1Id = "";
let infraId = "";
let orchestId = "";
let consumer1Id = "";
let dataResource1Id = "";
let dataResource2Id = "";
let softwareResource1Id: "";
let softwareResource2Id: "";
let orchestJwt = "";
let provider1Jwt = "";
let infraJwt = "";
let consumer1Jwt = "";
let providerServiceOffering1Id = "";
let consumerServiceOffering1Id = "";
let requestId1: "";
let requestId2: "";
let ecosystemId = "";
let infrastructureServiceId = "";
let ecosystemContractId = "";
let dataProcessingChainId = "";

describe("Ecosystem Data processing routes tests", () => {
  let loadMongooseStub;
  before(async () => {
    loadMongooseStub = stub(loadMongoose, "loadMongoose").callsFake(
      async () => {
        await openMongoMemory();
      }
    );
    // Start the server and obtain the app and server instances
    const serverInstance = await startServer(3001);
    await serverInstance.promise;
    app = serverInstance.app;
    server = serverInstance.server;
    mockContract();

    // Create provider
    const provider1Data = testProvider6;
    const provider1Response = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(provider1Data);
    provider1Id = provider1Response.body.participant._id;

    // Create infra
    const infraData = infra;
    const infraResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(infraData);
      infraId = infraResponse.body.participant._id;

    // Create consumer 1
    const consumer1Data = testConsumer5;
    const consumer1Response = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(consumer1Data);
    consumer1Id = consumer1Response.body.participant._id;

    // Create orchestrator
    const orchestData = testOrchestrator2;
    const orchestResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(orchestData);
    orchestId = orchestResponse.body.participant._id;

    // Login provider1
    const provider1AuthResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/login`)
      .send({
        email: testProvider6.email,
        password: testProvider6.password,
      });
    provider1Jwt = provider1AuthResponse.body.token;
    // Login infra
    const infraAuthResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/login`)
      .send({
        email: infra.email,
        password: infra.password,
      });
    infraJwt = infraAuthResponse.body.token;

    // Login orchestrator
    const orchestAuthResponse = await request(app).post(`${process.env.API_PREFIX}/public/auth/login`).send({
      email: testOrchestrator2.email,
      password: testOrchestrator2.password,
    });
    orchestJwt = orchestAuthResponse.body.token;

    // Login consumer 1
    const consumer1AuthResponse = await request(app)
      .post(`${process.env.API_PREFIX}/public/auth/login`)
      .send({
        email: testConsumer5.email,
        password: testConsumer5.password,
      });
    consumer1Jwt = consumer1AuthResponse.body.token;

    // Create data resource 1
    const dataResource1Data = sampleDataResource;
    const dataResponse1 = await request(app)
      .post(`${process.env.API_PREFIX}/dataResources`)
      .set("Authorization", `Bearer ${provider1Jwt}`)
      .send(dataResource1Data);
    dataResource1Id = dataResponse1.body._id;
    // Create service offerings 1
    const resProvider1 = await request(app)
      .post(`${process.env.API_PREFIX}/serviceofferings`)
      .set("Authorization", `Bearer ${provider1Jwt}`)
      .send({ ...sampleProviderServiceOffering, providedBy: provider1Id });
    providerServiceOffering1Id = resProvider1.body._id;
    // Create data resource 2
    const dataResource2Data = sampleDataResource;
    const dataResponse2 = await request(app)
      .post(`${process.env.API_PREFIX}/dataResources`)
      .set("Authorization", `Bearer ${infraJwt}`)
      .send(dataResource2Data);
    dataResource2Id = dataResponse2.body._id;
    //Create Infrastructure Service
    const res = await request(app)
    .post(`${process.env.API_PREFIX}/infrastructureservices`)
    .set("Authorization", `Bearer ${infraJwt}`)
    .send({ ...sampleProviderInfrastructureService, providedBy: infraId })
    .expect(201);
    infrastructureServiceId = res.body._id;

    //create software resource 1
    const softwareResource1Data = sampleSoftwareResource;
    const softwareResponse1 = await request(app)
      .post(`${process.env.API_PREFIX}/softwareresources`)
      .set("Authorization", `Bearer ${consumer1Jwt}`)
      .send(softwareResource1Data);
    softwareResource1Id = softwareResponse1.body.id;
    // Create service offerings 1
    const resConsumer1 = await request(app)
      .post(`${process.env.API_PREFIX}/serviceofferings`)
      .set("Authorization", `Bearer ${consumer1Jwt}`)
      .send({ ...sampleConsumerServiceOffering, providedBy: consumer1Id });
    consumerServiceOffering1Id = resConsumer1.body._id;

    //create the ecosystem
    const resCreateEcosystem = await request(app)
      .post(`${process.env.API_PREFIX}/ecosystems`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleEcosystem)
    ecosystemId = resCreateEcosystem.body._id;

    //create ecosystem contract
    const resCreateEcosystemCOntract = await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/contract`)
    .set("Authorization", `Bearer ${orchestJwt}`);
    ecosystemContractId = resCreateEcosystemCOntract.body._id

    //apply Orchestrator signature
    const resApplyOrchestraorSignature = await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/signature/orchestrator`)
    .set("Authorization", `Bearer ${orchestJwt}`)
    .send({
      signature: "hasSigned",
    })

    //create invitation to join ecosystem for a data provider
    await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/invites`)
    .set("Authorization", `Bearer ${orchestJwt}`)
    .send({ ...sampleInvitation, participantId: provider1Id })
    .expect(200);

    //create invitation to join ecosystem for a service provider
    await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/invites`)
    .set("Authorization", `Bearer ${orchestJwt}`)
    .send({ ...sampleInvitation, participantId: consumer1Id })
    .expect(200);

    //accept invitation to join ecosystem
    await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/invites/accept`)
    .set("Authorization", `Bearer ${provider1Jwt}`)

    await request(app)
    .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/invites/accept`)
    .set("Authorization", `Bearer ${consumer1Jwt}`)
       
    //apply Participant Signature
    await request(app)
        .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/signature/participant`)
        .set("Authorization", `Bearer ${provider1Jwt}`)
        .send({
          signature: "hasSigned",
        })
    await request(app)
        .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/signature/participant`)
        .set("Authorization", `Bearer ${consumer1Jwt}`)
        .send({
          signature: "hasSigned",
        })

        //configure Participant Ecosystem Offerings
    const modifiedProviderSampleOfferings = { ...sampleOfferings };
    modifiedProviderSampleOfferings.offerings[0].serviceOffering =
          providerServiceOffering1Id;
    await request(app)
      .put(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/offerings`)
      .set("Authorization", `Bearer ${provider1Jwt}`)
      .send(modifiedProviderSampleOfferings)

    const modifiedSampleOfferings = { ...sampleOfferings };
        modifiedSampleOfferings.offerings[0].serviceOffering =
          consumerServiceOffering1Id;
    await request(app)
      .put(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/offerings`)
      .set("Authorization", `Bearer ${consumer1Jwt}`)
      .send(modifiedSampleOfferings)
    
  });

  after(() => {
    // Close the server after all tests are completed
    loadMongooseStub.restore();
    closeMongoMemory();
    server.close();
  });

  // New tests for data processing chain
  it("should add infrastructure Service to ecosystem", async () => {
    const sampleInfrastructureService = {
        infrastructureServices: [
            infrastructureServiceId
      ]
    };

    const response = await request(app)
      .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/addinfrastructureservices`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleInfrastructureService)
      .expect(200);
  });

  it("should accept infrastructure to join ecosystem", async () => {

    const response = await request(app)
      .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/signature/infrastructureprovider`)
      .set("Authorization", `Bearer ${infraJwt}`)
      .send({signature: "HasSigned"})
      .expect(200);


    expect(response.body).to.have.property('message', "successfully signed contract");
  });

  it("should add data processing chain to ecosystem", async () => {
    const sampleDataProcessingChain = {
      dataProcessingChain: [
        {
            participant: provider1Id,
            resource: providerServiceOffering1Id,
        },
        {
            participant: infraId,
            resource: infrastructureServiceId,
        },
        {
            participant: consumer1Id,
            resource: consumerServiceOffering1Id,
        },
    ]};

    mockContract(ecosystemContractId);

    const response = await request(app)
      .post(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/adddataprocessingchain`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleDataProcessingChain)
      .expect(200)

      dataProcessingChainId = response.body.dataProcessingChains[0]._id
  });

  it("should update data processing chain in ecosystem", async () => {
    const sampleDataProcessingChain = {
        dataProcessingChain: [
          {
              participant: provider1Id,
              resource: providerServiceOffering1Id,
          },
          {
              participant: infraId,
              resource: infrastructureServiceId,
              configuration: "4654654687"
          },
          {
              participant: consumer1Id,
              resource: consumerServiceOffering1Id,
              params: [{custom: "custom"}]
          },
      ]};

    mockContract(ecosystemContractId, dataProcessingChainId);

    const response = await request(app)
      .put(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/updatedataprocessingchain/${dataProcessingChainId}`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .send(sampleDataProcessingChain)
      .expect(200)
  });

  it("should delete data processing chain from ecosystem", async () => {
    const response = await request(app)
      .delete(`${process.env.API_PREFIX}/ecosystems/${ecosystemId}/sample-chain-id`)
      .set("Authorization", `Bearer ${orchestJwt}`)
      .expect(200);
  });

  it("should delete the ecosystem by Id", async () => {
    const response = await request(app)
      .delete(`${process.env.API_PREFIX}/ecosystems/` + ecosystemId)
      .set("Authorization", `Bearer ${orchestJwt}`);

    expect(response.status).to.equal(200);
  });
});
