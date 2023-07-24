import request from "supertest";
import { app } from "./index";

let participantId;
let jwt;

export async function setup() {
  // Create a participant and store its ID
  const participantData = {
    hasLegallyBindingName: "TEST",
    hasPhoneNumber: "+333333333",
    email: "abc@test.com",
    password: "TEST123",
    description: "DESCRIPTION TEST",
    identifier: "0x12345",
  };

  const response = await request(app)
    .post("/v1/participants")
    .send(participantData)
    .expect(201);

  participantId = response.body.id;

  // Perform login and obtain JWT
  const loginCredentials = {
    email: "abc@test.com",
    password: "TEST123",
  };

  const loginResponse = await request(app)
    .post("/login")
    .send(loginCredentials)
    .expect(200);

  jwt = loginResponse.body.token;
}

export async function teardown() {
  // Delete the participant
  await request(app).delete(`/v1/participants/${participantId}`).expect(200);
}

export function getParticipantId() {
  return participantId;
}

export function getJWT() {
  return jwt;
}
