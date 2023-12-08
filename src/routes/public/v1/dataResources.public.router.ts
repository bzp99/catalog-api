import { Router } from "express";
import {
  getDataResourceById,
  getDataResources,
} from "../../../controllers/public/v1/dataResources.public.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getDataResources);
router.get("/:id", passthroughMe, getDataResourceById);

export default router;
