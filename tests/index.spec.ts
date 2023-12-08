import { expect } from "chai";
import request from "supertest";
import { testParticipantOrganizationAdmin } from "./testAccount";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { Participant, OrganizationAdmin } from "../src/models";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
  sampleDataResource,
  sampleSoftwareResource,
  sampleEcosystem,
  sampleServiceOffering,
} from "./sampleData";
import { Application } from "express";

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

let participantId = "";
let adminId = "";
let jwt = "";
let ecosystemId = "";
let serviceOfferingId = "";

describe("Initialize with Participant creation and login", () => {
  it("Should signup and create a participant", async () => {
    const participantData = testParticipantOrganizationAdmin;

    const response = await request(app)
      .post("/v1/auth/signup")
      .send(participantData)
      .expect(201);

    expect(response.body).to.be.an("object");
    expect(response.body.admin).to.have.property("_id");
    participantId = response.body.participant._id;
    adminId = response.body.admin._id;
  });

  it("should login and return a token", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send({
        email: testParticipantOrganizationAdmin.email,
        password: testParticipantOrganizationAdmin.password,
      })
      .expect(200);
    jwt = response.body.token;
  });
});

describe("Ecosystem tests", () => {
  it("should create a new ecosystem", async () => {
    const response = await request(app)
      .post("/v1/ecosystems")
      .set("Authorization", `Bearer ${jwt}`)
      .send(sampleEcosystem)
      .expect(201);

    ecosystemId = response.body._id;
  });

  it("should return a valid response with an array of elements", async () => {
    const response = await request(app)
      .get("/v1/ecosystems/me")
      .set("Authorization", `Bearer ${jwt}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  it("should delete the ecosystem and return the deleted ecosystem", async () => {
    const response = await request(app)
      .delete("/v1/ecosystems/" + ecosystemId)
      .set("Authorization", `Bearer ${jwt}`);
    expect(response.status).to.equal(200);
  });
});

describe("Service offering management", () => {
  it("Should create a service offering", async () => {
    const res = await request(app)
      .post("/v1/serviceofferings")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleServiceOffering, providedBy: participantId })
      .expect(201);

    serviceOfferingId = res.body._id;
  });

  it("Should retrieve the service offering by id", async () => {
    await request(app)
      .get("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should retrieve a list of service offerings for the user", async () => {
    const res = await request(app)
      .get("/v1/serviceofferings/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should delete the service offering", async () => {
    await request(app)
      .delete("/v1/serviceofferings/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(204);
  });
});

describe("Cleanup", () => {
  describe("Cleanup created participant", () => {
    it("Should delete the test participant and its associated organization admin", async () => {
      const participant = await Participant.findByIdAndDelete(participantId);
      expect(participant).to.not.be.null;
      const admin = await OrganizationAdmin.findByIdAndDelete(adminId);
      expect(admin).to.not.be.null;
    });
  });
});
