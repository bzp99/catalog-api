import { Router } from "express";
import { check } from "express-validator";
import {
  getDCATServiceOfferings,
  getServiceOfferingById,
  getServiceOfferings,
} from "../../../controllers/public/v1/serviceOfferings.public.controller";
import { passthroughMe } from "../../../middleware/passthrough";
import { validate } from "../../../middleware/validator";

const router: Router = Router();

router.get("/", getServiceOfferings);
router.get("/dcat", getDCATServiceOfferings);
router.get(
  "/:id",
  passthroughMe,
  [check("id").isMongoId()],
  validate,
  getServiceOfferingById
);

export default router;
