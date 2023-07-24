import { expect } from "chai";
import request from "supertest";
import { loginCredentials, testParticipant } from "./testAccount";
import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";
import {
  sampleDataOffering,
  sampleEcosystem,
  sampleServiceOffering,
} from "./sampleData";

export let app: Express.Application;
export let server: Server<typeof IncomingMessage, typeof ServerResponse>;

before((done) => {
  // Start the server and obtain the app and server instances
  const serverInstance = startServer(3001);
  app = serverInstance.app;
  server = serverInstance.server;

  // Wait for the server to start before proceeding
  server.on("listening", () => {
    done();
  });
});

after((done) => {
  // Close the server after all tests are completed
  server.close(() => {
    done();
  });
});

let participantId = "";
let jwt = "";
let ecosystemId = "";
let dataOfferingId = "";
let serviceOfferingId = "";

describe("Initialize with Participant creation and login", () => {
  it("Should create a participant and respond with the created participant", async () => {
    const participantData = testParticipant;

    const response = await request(app)
      .post("/v1/participants")
      .send(participantData)
      .expect(201);

    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("_id");
    participantId = response.body._id;
  });

  it("should login and return a token", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send(loginCredentials)
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
      .post("/v1/services")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleServiceOffering, offeredBy: [participantId] })
      .expect(201);

    serviceOfferingId = res.body._id;
  });

  it("Should retrieve the service offering by id", async () => {
    await request(app)
      .get("/v1/services/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should retrieve a list of service offerings by the user", async () => {
    const res = await request(app)
      .get("/v1/services/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);

    expect(res.body).to.be.an("array");
  });

  it("Should delete the service offering", async () => {
    await request(app)
      .delete("/v1/services/" + serviceOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });
});

describe("Data offering management", () => {
  it("Should create a data offering", async () => {
    const res = await request(app)
      .post("/v1/data")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ ...sampleDataOffering, offeredBy: [participantId] })
      .expect(201);

    dataOfferingId = res.body._id;
  });

  it("Should retrieve the data offering by id", async () => {
    await request(app)
      .get("/v1/data/" + dataOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });

  it("Should retrieve a list of data offerings by the user", async () => {
    const res = await request(app)
      .get("/v1/data/me")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);

    expect(res.body).to.be.an("array");
  });

  it("Should delete the data offering", async () => {
    await request(app)
      .delete("/v1/data/" + dataOfferingId)
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200);
  });
});

describe("Cleanup", () => {
  describe("Cleanup created participant", () => {
    it(
      "Should delete the created participant with id " + participantId,
      async () => {
        const response = await request(app)
          .delete("/v1/participants/me")
          .set("Authorization", `Bearer ${jwt}`);
        expect(response.status).to.equal(200);
      }
    );
  });
});
