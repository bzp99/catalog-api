import { Router } from "express";
import {
  getDCATDataResources,
  getDataResourceById,
  getDataResources,
} from "../../../controllers/public/v1/dataResources.public.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getDataResources);
router.get("/dcat", getDCATDataResources);
router.get("/:id", passthroughMe, getDataResourceById);

export default router;
