import { Router } from "express";
import {
  getDataResourceSD,
  getDataServiceOfferingsForCategory,
  getEcosystemSD,
  getParticipantSD,
  getParticipants,
  getServiceOfferingSD,
  getSoftwareResourceSD,
  getSoftwareServiceOfferingsForCategory,
} from "../../../controllers/public/v1/catalog.public.controller";

const router: Router = Router();

router.get("/data/:category", getDataServiceOfferingsForCategory);
router.get("/services/:category", getSoftwareServiceOfferingsForCategory);
router.get("/participants", getParticipants);
router.get("/ecosystems/:id", getEcosystemSD);
router.get("/participants/:id", getParticipantSD);
router.get("/dataresources/:id", getDataResourceSD);
router.get("/softwareresources/:id", getSoftwareResourceSD);
router.get("/serviceofferings/:id", getServiceOfferingSD);

export default router;
