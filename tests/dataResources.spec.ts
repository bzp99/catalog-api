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
  sampleUpdatedDataResource,
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


describe(" Data Resources Routes Tests", () => {

  it("sign up and login participant", async () => {
  //create provider
  const providerData = testProvider;
  const providerResponse = await request(app)
    .post("/v1/auth/signup")
    .send(providerData)
    providerId = providerResponse.body.participant._id;
    console.log(providerId)
  //login provider
  const response = await request(app)
  .post("/v1/auth/login")
  .send({
    email: testProvider.email,
    password: testProvider.password,
  })
  .expect(200);
jwt = response.body.token;
console.log(jwt)
})

  it("should create data resource", async () => {
    const dataResourceData = sampleDataResource;
    const response = await request(app)
      .post("/v1/dataResources")
      .set("Authorization", `Bearer ${jwt}`)
      .send(dataResourceData)
      .expect(201);
      dataResourcesId = response.body._id; 
      console.log(dataResourcesId)
    expect(response.body).to.be.an("object");
    //assertions
  });
  it("should update data resource", async () => {
    const updatedDataResourceData = sampleUpdatedDataResource;

    const response = await request(app)
      .put(`/v1/dataResources/${dataResourcesId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(updatedDataResourceData)
      .expect(200);
    //assertions
  });
  it("should get data resource by ID-public", async () => {

    const response = await request(app)
      .get(`/v1/dataResources/${dataResourcesId}`)
      .expect(200);
    //assertions
    //expect reponse id = dataresourceid
  });
  it("should get data resource by ID-protected", async () => {
    const response = await request(app)
      .get(`/v1/dataResources/${dataResourcesId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
    //assertions
    //expect reponse id = dataresourceid
  });
  it("should get Participant DataResources", async () => {

    const response = await request(app)
      .get("/v1/dataResources/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
    //assertions
    //expect reponse not empty
  });
  it("should get all dataResources", async () => {

    const response = await request(app)
      .get("/v1/dataResources")
      .expect(200);
    //assertions
    //expect reponse not empty
  });

  it("should delete DataResources", async () => {
    const response = await request(app)
      .delete(`/v1/dataResources/${dataResourcesId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
    //assertions
    //expect 
    //error test get data resources deleted
  });

});
