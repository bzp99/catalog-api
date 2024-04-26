import { Router } from "express";
import {
  getDCATDataResourceById,
  getDCATDataResources,
  getDataResourceById,
  getDataResources,
} from "../../../controllers/public/v1/dataResources.public.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getDataResources);
router.get("/dcat", getDCATDataResources);

router.get("/:id", passthroughMe, getDataResourceById);
router.get("/dcat/:id", passthroughMe, getDCATDataResourceById);

export default router;
