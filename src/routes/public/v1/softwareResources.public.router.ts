import { Router } from "express";
import {
  getDCATSoftwareResources,
  getSoftwareResources,
} from "../../../controllers/public/v1/softwareResources.public.controller";
import { getSoftwareResourceById } from "../../../controllers/private/v1/softwareResources.private.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getSoftwareResources);
router.get("/dcat", getDCATSoftwareResources);
router.get("/:id", passthroughMe, getSoftwareResourceById);

export default router;
