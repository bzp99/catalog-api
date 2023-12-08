import { Router } from "express";
import { getSoftwareResources } from "../../../controllers/public/v1/softwareResources.public.controller";
import { getSoftwareResourceById } from "../../../controllers/private/v1/softwareResources.private.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getSoftwareResources);
router.get("/:id", passthroughMe, getSoftwareResourceById);

export default router;
