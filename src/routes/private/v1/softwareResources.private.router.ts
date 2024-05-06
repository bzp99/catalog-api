import { Router } from "express";
import { verifyJwtMiddleware } from "../../../middleware/auth";
import {
  createSoftwareResource,
  deleteSoftwareResource,
  getParticipantSoftwareResources,
  updateSoftwareResource,
} from "../../../controllers/private/v1/softwareResources.private.controller";
import { body, param } from "express-validator";
import { validate } from "../../../middleware/validator";

const router: Router = Router();

router.use(verifyJwtMiddleware);

router.get("/me", getParticipantSoftwareResources);

router.post(
  "/",
  [
    body("aggregationOf").exists().isArray(),
    body("name").exists().isString().trim(),
    body("description").exists().isString().trim(),
    body("copyrightOwnedBy").exists().isArray().notEmpty(),
    body("license").exists().isArray().notEmpty(),
    body("policy").optional().isArray(),
    // body("providedBy").exists().isString().trim(),
    body("category").exists().isString(),
    body("locationAddress").exists().isArray(),
    body("users_clients").exists().isNumeric(),
    body("demo_link").optional().isString(),
    body("relevant_project_link").optional().isString(),
  ],
  validate,
  createSoftwareResource
);

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("aggregationOf").optional().isArray().notEmpty(),
    body("name").optional().isString().trim(),
    body("description").optional().isString().trim(),
    body("copyrightOwnedBy").optional().isArray().notEmpty(),
    body("license").optional().isArray().notEmpty(),
    body("policy").optional().isArray(),
    // body("providedBy").optional().isString().trim(),
    body("category").optional().isString(),
    // body("locationAddress").optional().isString().notEmpty(),
    body("locationAddress").optional().isArray().notEmpty(),
    body("users_clients").optional().isNumeric(),
    body("demo_link").optional().isURL(),
    body("relevant_project_link").optional().isURL(),
  ],
  validate,
  updateSoftwareResource
);

router.delete(
  "/:id",
  [param("id").isMongoId()],
  validate,
  deleteSoftwareResource
);

export default router;
