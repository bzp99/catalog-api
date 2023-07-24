import { Router } from "express";
import {
  getAllDataOfferings,
  getDataOfferingById,
} from "../../controllers/public/dataPublicController";
const r: Router = Router();

r.get("/", getAllDataOfferings);
r.get("/:id", getDataOfferingById);

export default r;
