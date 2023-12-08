import { Router } from "express";
import { body, param } from "express-validator";

import { verifyJwtMiddleware } from "../../../middleware/auth";
import { validate } from "../../../middleware/validator";
import { getDataResourceById } from "../../../controllers/public/v1/dataResources.public.controller";
import {
  createDataResource,
  deleteDataResource,
  getParticipantDataResources,
  updateDataResource,
} from "../../../controllers/private/v1/dataResources.private.controller";

const router: Router = Router();

router.use(verifyJwtMiddleware);

router.get("/me", getParticipantDataResources);

router.get(
  "/:id",
  [param("id").isString().isMongoId()],
  validate,
  getDataResourceById
);

router.post(
  "/",
  [
    body("aggregationOf").exists().isArray(),
    body("name").exists().isString().trim(),
    body("description").exists().isString().trim(),
    body("copyrightOwnedBy").exists().isArray(),
    body("license").exists().isArray(),
    body("policy").exists().isArray(),
    body("exposedThrough").exists().isArray(),
    body("obsoleteDateTime").exists().isString().trim(),
    body("containsPII").exists().isBoolean(),
    body("category").optional().isString(),
  ],
  validate,
  createDataResource
);

router.put(
  "/:id",
  [
    param("id").isString().isMongoId(),
    body("aggregationOf").optional().isArray(),
    body("name").optional().isString().trim(),
    body("description").optional().isString().trim(),
    body("copyrightOwnedBy").optional().isArray(),
    body("license").optional().isArray(),
    body("policy").optional().isArray(),
    body("exposedThrough").optional().isArray(),
    body("obsoleteDateTime").optional().isString().trim(),
    body("containsPII").optional().isBoolean(),
    body("category").optional().isString(),
  ],
  validate,
  updateDataResource
);

router.delete(
  "/:id",
  [param("id").isString().isMongoId()],
  validate,
  deleteDataResource
);

export default router;
