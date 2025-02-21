import { expect } from "chai";
import request from "supertest";
import { testProvider5 } from "./fixtures/testAccount";
import { config } from "dotenv";
config();
import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";

import {
  sampleDataResource,
  sampleProviderInfrastructureService,
  sampleProviderInfrastructureServiceDraft,
  sampleUpdatedProviderInfrastructureService,
} from "./fixtures/sampleData";
import { Application } from "express";
import { stub } from "sinon";
import * as loadMongoose from "../src/config/database";
import { closeMongoMemory, openMongoMemory } from "./utils.ts/mongoMemory";

let app: Application;
let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let providerId = "";
let dataResourcesId = "";
let jwt = "";
let infrastructureServiceId = "";

describe("Infrastructure Service Routes Tests", () => {
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

    // Create provider
    const providerData = testProvider5;
    const providerResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(providerData);
    providerId = providerResponse.body.participant._id;

    // Login provider
    const providerAuthResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/login`)
      .send({
        email: testProvider5.email,
        password: testProvider5.password,
      });
    jwt = providerAuthResponse.body.token;

    // Create data resources
    const dataResourceData = sampleDataResource;
    const dataResponse = await request(app)
      .post(`${process.env.API_PREFIX}/dataResources`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(dataResourceData);
    dataResourcesId = dataResponse.body._id;
  });

  after(async () => {
    // Close the server after all tests are completed
    loadMongooseStub.restore();
    await closeMongoMemory();
    server.close();
  });

  it("Should create an infrastructure service", async () => {
    const res = await request(app)
      .post(`${process.env.API_PREFIX}/infrastructureservices`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleProviderInfrastructureService, providedBy: providerId })
      .expect(201);
    infrastructureServiceId = res.body._id;
  });

  it("Should create a draft infrastructure service", async () => {
    const res = await request(app)
      .post(`${process.env.API_PREFIX}/infrastructureservices/draft`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleProviderInfrastructureServiceDraft, providedBy: providerId })
      .expect(201);
    expect(res.body.status).to.equal("draft");
  });

  it("Should get the infrastructure service by id-public", async () => {
    await request(app)
      .get(`${process.env.API_PREFIX}/infrastructureservices/` + infrastructureServiceId)
      .expect(200);
  });

  it("Should get Infrastructure Services For Participant", async () => {
    await request(app)
      .get(`${process.env.API_PREFIX}/infrastructureservices/participant/${providerId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should get Session Participant Infrastructure Services", async () => {
    await request(app)
      .get(`${process.env.API_PREFIX}/infrastructureservices/me`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should get all Infrastructure Services", async () => {
    await request(app).get(`${process.env.API_PREFIX}/infrastructureservices`).expect(200);
  });

  it("Should update infrastructure service", async () => {
    await request(app)
      .put(`${process.env.API_PREFIX}/infrastructureservices/${infrastructureServiceId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(sampleUpdatedProviderInfrastructureService)
      .expect(200);
  });

  it("Should delete the infrastructure service", async () => {
    await request(app)
      .delete(`${process.env.API_PREFIX}/infrastructureservices/` + infrastructureServiceId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(204);
  });
});
