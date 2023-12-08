import { config } from "dotenv";

config();

type Env = "development" | "staging" | "production";

type EnvironmentConfig = {
  env: Env;
  port: number;
  mongoUserName: string;
  mongoPassword: string;
  mongoPort: number;
  mongoHost: string;
  mongoDatabase: string;
  apiUrl: string;
  jwtSecretKey: string;
  saltRounds: number;
  contractServiceEndpoint: string;
};

export const CONFIG: EnvironmentConfig = {
  env: (process.env.NODE_ENV as Env) || "development",
  port: parseInt(process.env.PORT) || 3000,
  mongoDatabase: process.env.MONGO_DATABASE || "ptx-catalog",
  mongoHost: process.env.MONGO_HOST || "localhost",
  mongoPassword: process.env.MONGO_PASSWORD || "",
  mongoUserName: process.env.MONGO_USERNAME || "",
  mongoPort: parseInt(process.env.MONGO_PORT) || 27017,
  apiUrl: process.env.API_URL || "",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "ptxCatalogSecretKey",
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  contractServiceEndpoint:
    process.env.CONTRACT_SERVICE_ENDPOINT || "http://localhost:8888",
};
