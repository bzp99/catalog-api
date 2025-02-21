import { Router } from "express";
import { check } from "express-validator";
import {
  getInfrastructureServiceById,
  getInfrastructureServices,
} from "../../../controllers/public/v1/infrastructureServices.public";
import { passthroughMe } from "../../../middleware/passthrough";

const router: Router = Router();

router.get("/", passthroughMe, getInfrastructureServices);
router.get(
  "/:id",
  passthroughMe,
  [check("id").isMongoId()],
  getInfrastructureServiceById
);

export default router;
