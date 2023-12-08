import { Router } from "express";
import { body, check } from "express-validator";
import { verifyJwtMiddleware } from "../../../middleware/auth";
import {
  createServiceOffering,
  deleteServiceOffering,
  getServiceOfferingsForParticipant,
  getSessionParticipantServiceOfferings,
  updateServiceOffering,
} from "../../../controllers/private/v1/serviceOfferings.private.controller";
import {
  isDataAccountExportArray,
  validate,
} from "../../../middleware/validator";

const router: Router = Router();

router.use(verifyJwtMiddleware);

router.get("/me", getSessionParticipantServiceOfferings);
router.get("/participant/:id", getServiceOfferingsForParticipant);

router.post(
  "/",
  [
    body("aggregationOf").exists().isArray().notEmpty(),
    body("name").exists().isString().trim(),
    body("description").exists().isString().trim(),
    body("policy").exists().isArray(),
    body("termsAndConditions").exists().isString().trim(),
    body("dataProtectionRegime").exists().isArray(),
    body("dataAccountExport").exists().custom(isDataAccountExportArray),
    body("location").exists().isString().trim(),
    body("keywords").exists().isArray(),
    body("dataResources").exists().isArray(),
    body("softwareResources").exists().isArray(),
  ],
  validate,
  createServiceOffering
);

router.put(
  "/:id",
  [
    check("id").isMongoId(),
    body("aggregationOf").optional().isArray().notEmpty(),
    body("name").optional().isString().trim(),
    body("description").optional().isString().trim(),
    body("policy").optional().isArray(),
    body("termsAndConditions").optional().isString().trim(),
    body("dataProtectionRegime").optional().isArray(),
    body("dataAccountExport").optional().custom(isDataAccountExportArray),
    body("location").optional().isString().trim(),
    body("keywords").optional().isArray(),
    body("dataResources").optional().isArray(),
    body("softwareResources").optional().isArray(),
  ],
  validate,
  updateServiceOffering
);

router.delete(
  "/:id",
  [check("id").isString().isMongoId()],
  validate,
  deleteServiceOffering
);

export default router;
