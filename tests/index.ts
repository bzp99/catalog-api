import { config } from "dotenv";
config();

import { startServer } from "../src/server";
import { IncomingMessage, Server, ServerResponse } from "http";

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
