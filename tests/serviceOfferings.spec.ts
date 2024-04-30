import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { Application } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";

import { 
  testProvider,
 } from "./testAccount";

import {
  sampleDataResource,
  sampleUpdatedServiceOfferings,
  sampleServiceOffering
} from "./sampleData";

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;


before(async () => {
  // Start the server and obtain the app and server instances
  const serverInstance = await startServer(3001);
  app = serverInstance.app;
  server = serverInstance.server;
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});
let providerId = "";
let dataResourcesId;
let jwt = "";
let serviceOfferingId = "";


describe("Service offering management", () => {
  it("Should create a service offering of data provider", async () => {
    const res = await request(app)
      .post("/v1/serviceofferings")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleServiceOffering, providedBy: providerId })
      .expect(201);

    serviceOfferingId = res.body._id;
  });

  it("Should retrieve the service offering by id", async () => {
    await request(app)
      .get("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
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
  it("Should update service offerings", async () => {
    const res = await request(app)
      .put(`/v1/serviceofferings/${serviceOfferingId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(sampleUpdatedServiceOfferings)
      .expect(200);
  });

  it("Should delete the service offering", async () => {
    await request(app)
      .delete("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(204);
  });
});