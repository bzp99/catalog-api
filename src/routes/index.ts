import { Application, Request, Response } from "express";

// Routes
import { globalErrorHandler } from "../middleware/globalErrorHandler";

import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../../docs/swagger.json";
import { invalidEndpointHandler } from "../middleware/invalidEndpointHandler";

const API_PREFIX = "/v1";

import auth from "./auth";
import data from "./data";
import ecosystems from "./ecosystems";
import participants from "./participants";
import services from "./services";

export const loadRoutes = (app: Application) => {
  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "OK" });
  });
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.use(`${API_PREFIX}/auth`, auth);
  app.use(`${API_PREFIX}/ecosystems`, ecosystems);
  app.use(`${API_PREFIX}/participants`, participants);
  app.use(`${API_PREFIX}/services`, services);
  app.use(`${API_PREFIX}/data`, data);

  app.use(invalidEndpointHandler);
  app.use(globalErrorHandler);
};
