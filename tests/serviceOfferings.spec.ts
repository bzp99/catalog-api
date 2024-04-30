import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
import { startServer } from "../src/server";
import { Application } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { testProvider4 } from "./testAccount";
import {
  sampleDataResource,
  sampleUpdatedProviderServiceOffering,
  sampleProviderServiceOffering,
} from "./sampleData";

config();

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let providerId = "";
let dataResourcesId = "";
let jwt = "";
let serviceOfferingId = "";

before(async () => {
  // Start the server and obtain the app and server instances
  const serverInstance = await startServer(3005);
  app = serverInstance.app;
  server = serverInstance.server;

  // Create provider
  const providerData = testProvider4;
  const providerResponse = await request(app)
    .post("/v1/auth/signup")
    .send(providerData);
  providerId = providerResponse.body.participant._id;
  console.log(providerId);

  // Login provider
  const providerAuthResponse = await request(app)
    .post("/v1/auth/login")
    .send({
      email: testProvider4.email,
      password: testProvider4.password,
    });
  jwt = providerAuthResponse.body.token;
  console.log(jwt);

  // Create data resources
  const dataResourceData = sampleDataResource;
  const dataResponse = await request(app)
    .post("/v1/dataResources")
    .set("Authorization", `Bearer ${jwt}`)
    .send(dataResourceData);
  dataResourcesId = dataResponse.body._id;
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});

describe("Service offering management", () => {
  it("Should create a service offering", async () => {
    const res = await request(app)
      .post("/v1/serviceofferings")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleProviderServiceOffering, providedBy: providerId })
      .expect(201);
    serviceOfferingId = res.body._id;
  });

  it("Should get the service offering by id-protected", async () => {
    await request(app)
      .get("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should get the service offering by id-public", async () => {
    await request(app)
      .get("/v1/serviceofferings/" + serviceOfferingId)
      .expect(200);
  });

  it("Should get ServiceOfferings For Participant", async () => {
    const res = await request(app)
      .get(`/v1/serviceofferings/participant/${serviceOfferingId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should get Session Participant ServiceOfferings", async () => {
    const res = await request(app)
      .get("/v1/serviceofferings/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should get all ServiceOfferings", async () => {
    const res = await request(app)
      .get("/v1/serviceofferings")
      .expect(200);
  });

  it("Should get DCAT ServiceOfferings", async () => {
    const res = await request(app)
      .get("/v1/serviceofferings/dcat")
      .expect(200);
  });

  it("Should get DCAT ServiceOffering by id", async () => {
    const res = await request(app)
      .get(`/v1/serviceofferings/dcat/${serviceOfferingId}`)
      .expect(200);
  });

  it("Should update service offerings", async () => {
    const res = await request(app)
      .put(`/v1/serviceofferings/${serviceOfferingId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(sampleUpdatedProviderServiceOffering)
      .expect(200);
  });

  it("Should delete the service offering", async () => {
    await request(app)
      .delete("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(204);
  });
});
