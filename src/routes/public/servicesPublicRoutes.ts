import { Router } from "express";
import {
  getAllServices,
  getServiceById,
} from "../../controllers/public/servicesPublicController";
const r: Router = Router();

r.get("/", getAllServices);
r.get("/:id", getServiceById);

export default r;
