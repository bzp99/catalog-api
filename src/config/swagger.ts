import swaggerDocument from "../../docs/swagger.json";

export const getSwaggerConfig = () => {
  return {
    ...swaggerDocument,
    servers: [
      {
        url: process.env.API_PREFIX || "",
        description: "API Server",
      },
    ],
  };
};
