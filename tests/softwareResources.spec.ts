import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
import { startServer } from "../src/server";
import { Application } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { testConsumer4 } from "./fixtures/testAccount";
import {
  sampleSoftwareResource,
  sampleUpdatedSoftwareResource,
} from "./fixtures/sampleData";
import { stub } from "sinon";
import * as loadMongoose from "../src/config/database";
import { closeMongoMemory, openMongoMemory } from "./utils.ts/mongoMemory";

config();

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

let consumerId = "";
let softwareResourceId: "";
let jwt = "";

describe("Software Resources Routes Tests", () => {
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

    // Create consumer
    const consumerData = testConsumer4;
    const consumerResponse = await request(app)
      .post(`${process.env.API_PREFIX}/auth/signup`)
      .send(consumerData);
    consumerId = consumerResponse.body.participant._id;

    // Login consumer
    const response = await request(app)
      .post(`${process.env.API_PREFIX}/auth/login`)
      .send({
        email: testConsumer4.email,
        password: testConsumer4.password,
      })
      .expect(200);
    jwt = response.body.token;
  });

  after(async () => {
    // Close the server after all tests are completed
    loadMongooseStub.restore();
    closeMongoMemory();
    server.close();
  });

  it("should create software resource", async () => {
    const softwareResourceData = sampleSoftwareResource;
    const response = await request(app)
      .post(`${process.env.API_PREFIX}/softwareresources`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(softwareResourceData)
      .expect(201);
    softwareResourceId = response.body._id;
    expect(response.body).to.be.an("object");
    expect(response.body.providedBy).to.equal(consumerId);

    //assertions
  });

  it("should update software resource", async () => {
    const updatedSoftwareResourceData = sampleUpdatedSoftwareResource;
    const response = await request(app)
      .put(`${process.env.API_PREFIX}/softwareresources/${softwareResourceId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(updatedSoftwareResourceData)
      .expect(200);
    //assertions
  });

  it("should get software resource by ID-public", async () => {
    const response = await request(app)
      .get(`${process.env.API_PREFIX}/softwareresources/${softwareResourceId}`)
      .expect(200);
    //assertions
    //expect response id = softwareResourceId
  });

  it("should get Participant softwareresources", async () => {
    const response = await request(app)
      .get(`${process.env.API_PREFIX}/softwareresources/me`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
    //assertions
    //expect response not empty
  });

  it("should get all softwareresources", async () => {
    const response = await request(app)
      .get(`${process.env.API_PREFIX}/softwareresources`)
      .expect(200);
    //assertions
    //expect response not empty
  });

  it("should delete softwareResource", async () => {
    const response = await request(app)
      .delete(`${process.env.API_PREFIX}/softwareresources/${softwareResourceId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(204);
    //assertions
    //expect
  });
  // test error get software resources deleted
});
