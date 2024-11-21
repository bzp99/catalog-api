import { body, check } from "express-validator";
import {
  isDataAccountExportArray,
  validate,
} from "../../../middleware/validator";
import { Router } from "express";
import { verifyJwtMiddleware } from "../../../middleware/auth";
import { isInfrastructureServiceUpdateAllowed } from "../../../middleware/isUpdateAllowed.middleware";
import {
  createDraftInfrastructureService,
  createInfrastructureService,
  deleteInfrastructureService,
  getInfrastructureServicesForParticipant,
  getSessionParticipantInfrastructureService,
  updateInfrastructureService,
} from "../../../controllers/private/v1/infrastructureServices.private.controller";

const router: Router = Router();
router.use(verifyJwtMiddleware);

router.get("/me", getSessionParticipantInfrastructureService);
router.get("/participant/:id", getInfrastructureServicesForParticipant);

router.post(
  "/",
  [
    body("aggregationOf").isArray(),
    body("name").exists().isString().trim(),
    body("description").exists().isString().trim(),
    body("detailedDescription").optional().isString().trim(),
    body("policy").isArray(),
    body("termsAndConditions").isString().trim(),
    body("dataProtectionRegime").isArray(),
    body("dataAccountExport").custom(isDataAccountExportArray),
    body("location").isString().trim(),
    body("keywords").isArray(),
    body("dataResources").isArray(),
    body("softwareResources").isArray(),
    body("costPerAPICall").optional().isNumeric(),
    body("maximumConsumption").isString().trim(),
    body("maximumPerformance").isString().trim(),
    body("b2cDescription").optional().isArray(),
    body("purpose").optional().isString().trim(),
    body("params").optional().isString().trim(),
    body("inputFormat").optional().isString().trim(),
    body("outputFormat").optional().isString().trim(),
  ],
  validate,
  createInfrastructureService
);

router.post(
  "/draft",
  [
    body("name").exists().isString().trim(),
    body("description").exists().isString().trim(),
    body("policy").exists().isArray(),
    body("detailedDescription").optional().isString().trim(),
    body("category").exists().isArray().notEmpty(),
  ],
  validate,
  createDraftInfrastructureService
);

router.put(
  "/:id",
  isInfrastructureServiceUpdateAllowed,
  [
    check("id").isMongoId(),
    body("aggregationOf").optional().isArray(),
    body("name").optional().isString().trim(),
    body("description").optional().isString().trim(),
    body("detailedDescription").optional().isString().trim(),
    body("policy").optional().isArray(),
    body("termsAndConditions").optional().isString().trim(),
    body("dataProtectionRegime").optional().isArray(),
    body("dataAccountExport").optional().custom(isDataAccountExportArray),
    body("location").optional().isString().trim(),
    body("keywords").optional().isArray(),
    body("dataResources").optional().isArray(),
    body("softwareResources").optional().isArray(),
    body("pricing").optional().isNumeric().trim(),
    body("pricingDescription").optional().isString().trim(),
    body("setupFee").optional().isNumeric(),
    body("costPerAPICall").optional().isNumeric(),
    body("maximumConsumption").optional().isString().trim(),
    body("maximumPerformance").optional().isString().trim(),
    body("b2cDescription").optional().isArray(),
    body("purpose").optional().isString().trim(),
    body("status").optional().isString().trim(),
    body("currency").optional().isString().trim(),
    body("billingPeriod").optional().isString().trim(),
    body("category").optional().isArray().notEmpty(),
    body("params").optional().isString().trim(),
    body("inputFormat").optional().isString().trim(),
    body("outputFormat").optional().isString().trim(),
  ],
  validate,
  updateInfrastructureService
);

router.delete(
  "/:id",
  [check("id").isString()],
  isInfrastructureServiceUpdateAllowed,
  validate,
  deleteInfrastructureService
);

export default router;
