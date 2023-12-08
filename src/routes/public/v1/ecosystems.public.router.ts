import { Router } from "express";
import {
  getCirculatingResourcesInEcosystem,
  getEcosystemById,
  getEcosystems,
  getParticipantEcosystems,
} from "../../../controllers/public/v1/ecosystems.public.controller";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", getEcosystems);
router.get("/participant/:id", getParticipantEcosystems);
router.get("/:id", passthroughMe, getEcosystemById);
router.get("/:id/circulating", getCirculatingResourcesInEcosystem);

export default router;
