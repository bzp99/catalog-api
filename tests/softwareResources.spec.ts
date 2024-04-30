import { expect } from "chai";
import request from "supertest";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { Application } from "express";
import { Participant, OrganizationAdmin } from "../src/models";
import { IncomingMessage, Server, ServerResponse } from "http";

import { 
  testConsumer
 } from "./testAccount";

import {
  sampleSoftwareResource,
  sampleUpdatedSoftwareResource,
} from "./sampleData";

export let app: Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

before(async () => {
  // Start the server and obtain the app and server instances
  const serverInstance = await startServer(3001);
  app = serverInstance.app;
  server = serverInstance.server;

    //create provider
    const consumerData = testConsumer;
    const consumerResponse = await request(app)
      .post("/v1/auth/signup")
      .send(consumerData)
      consumerId = consumerResponse.body.participant._id;
    //login provider
    const response = await request(app)
    .post("/v1/auth/login")
    .send({
      email: testConsumer.email,
      password: testConsumer.password,
    })
    .expect(200);
  jwt = response.body.token;
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});

let consumerId = "";
let softwareResourceId;
let jwt = "";

describe(" Software Resources Routes Tests", () => {
  it("should create software resource", async () => {
    const softawreResourceData = sampleSoftwareResource;

    const response = await request(app)
      .post("/v1/softwareresources")
      .set("Authorization", `Bearer ${jwt}`)
      .send(softawreResourceData)
      .expect(201);
      softwareResourcesId = response.body.id; 
    expect(response.body).to.be.an("object");
    //assertions
  });
  it("should update software resource", async () => {
    const updatedSoftwareResourceData = sampleUpdatedSoftwareResource;

    const response = await request(app)
      .put(`/v1/softwareresources/${softwareResourceId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(updatedSoftwareResourceData)
      .expect(200);
    //assertions
  });
  it("should get software resource by ID-public", async () => {

    const response = await request(app)
      .get(`/v1/softwareresources/${softwareResourceId}`)
      .expect(200);
    //assertions
    //expect reponse id = softwareresourceid
  });
  it("should get data resource by ID-protected", async () => {

    const response = await request(app)
      .set("Authorization", `Bearer ${jwt}`)
      .get(`/v1/softwareresources/${softwareResourceId}`)
      .expect(200);
    //assertions
    //expect reponse id = softwareresourceid
  });
  it("should get Participant softwareResources", async () => {

    const response = await request(app)
      .get("/v1/softwareresources/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
    //assertions
    //expect reponse not empty
  });
  it("should get all softwareResources", async () => {

    const response = await request(app)
      .get("/v1/softwareresources")
      .expect(200);
    //assertions
    //expect reponse not empty
  });
  
  it("should delete softwareResource", async () => {
    const response = await request(app)
      .set("Authorization", `Bearer ${jwt}`)
      .delete(`/v1/softwareresources/${softwareResourceId}`)
      .expect(200);
    //assertions
    //expect 
    //error test get data resources deleted
  });

});
