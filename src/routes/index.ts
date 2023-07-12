import { Application, Request, Response } from "express";

// Routes
import { globalErrorHandler } from "../middleware/globalErrorHandler";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../../docs/swagger.json";
import { invalidEndpointHandler } from "../middleware/invalidEndpointHandler";

const API_PREFIX = "/v1";

// Public routes
import auth from "./auth";
import publicParticipants from "./public/participantsPublicRoutes";
import publicEcosystems from "./public/ecosystemsPublicRoutes";

// Private routes
import privateParticipants from "./private/participantsPrivateRoutes";
import privateEcosystems from "./private/ecosystemsPrivateRoutes";

export const loadRoutes = (app: Application) => {
  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "OK" });
  });
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.use(`${API_PREFIX}/auth`, auth);
  app.use(`${API_PREFIX}/ecosystems`, publicEcosystems, privateEcosystems);
  app.use(
    `${API_PREFIX}/participants`,
    publicParticipants,
    privateParticipants
  );

  app.use(invalidEndpointHandler);
  app.use(globalErrorHandler);
};
