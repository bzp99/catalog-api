export const loginCredentials = {
  email: "john@example.com",
  password: "Password123!",
};

export const testParticipant = {
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
      email: loginCredentials.email,
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
  email: loginCredentials.email,
  password: loginCredentials.password,
  jsonld: "additional JSON-LD data",
};
