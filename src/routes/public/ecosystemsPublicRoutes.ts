import { Router } from "express";
import {
  getAllEcosystems,
  getEcosystemById,
} from "../../controllers/public/ecosystemsPublicController";
const r: Router = Router();

r.get("/", getAllEcosystems);
r.get("/:id", getEcosystemById);

export default r;
