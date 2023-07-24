import { expect } from "chai";
import request from "supertest";
import { app } from ".";

describe("GET /health", () => {
  it("Should return a 200 status response", async () => {
    const r = await request(app).get("/health");
    expect(r.status).to.equal(200);
  });
});

describe("GET /v1/ecosystems/me", () => {
  it("should return a valid response with an array of elements", async () => {
    const response = await request(app).get("/v1/ecosystems/me");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});
