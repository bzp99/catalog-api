import { expect } from "chai";
import request from "supertest";
import { app } from ".";
import { getParticipantId, getJWT } from "./setup.spec";

describe("Participants API", () => {
  describe("GET /me", () => {
    it("Should get the participant details", async () => {
      const participantId = getParticipantId();
      const jwt = getJWT();

      const res = await request(app).get("/v1/participants/me");
    });
  });

  describe("POST /v1/participants", () => {
    it("Should create a participant and respond with the created participant", async () => {
      const participantData = {
        hasLegallyBindingName: "John Doe",
        identifier: "JD123",
        address: {
          addressLocality: "City",
          addressRegion: "State",
          postalCode: "12345",
          streetAddress: "123 Main St",
        },
        url: "https://example.com",
        description: "Participant description",
        hasBusinessIdentifier: "Business123",
        hasMemberParticipant: ["participant1", "participant2"],
        hasLogo: "https://example.com/logo.png",
        contactPoint: [
          {
            email: "john@example.com",
            telephone: "1234567890",
            contactType: "primary",
          },
        ],
        hasCompanyType: "Type1",
        hasPhoneNumber: "9876543210",
        hasMemberPerson: [
          {
            name: "Jane Doe",
            email: "jane@example.com",
          },
        ],
        email: "john@example.com",
        password: "password123",
        jsonld: "additional JSON-LD data",
      };

      const response = await request(app)
        .post("/v1/participants")
        .send(participantData)
        .expect(201);

      expect(response.body).to.be.an("object");
      expect(response.body).to.include(participantData);
    });
  });
});
