import { NextFunction, Request, Response } from "express";
import { SERVICE_POPULATION } from "../../utils/schemaPopulation";
import { NotFoundError } from "../../errors/NotFoundError";
import ServiceOffering from "../../models/ServiceOffering/ServiceOffering.model";

/**
 * Retrieves Services. Uses pagination
 */
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = "10", page = "1", offeredBy } = req.query;

    const query = offeredBy
      ? { offeredBy: { $in: offeredBy.toString().split(",") } }
      : {};

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const services = await ServiceOffering.find(query)
      .skip(skip)
      .limit(parseInt(limit.toString()))
      .populate(SERVICE_POPULATION);

    const totalCount = await ServiceOffering.countDocuments();

    const totalPages = Math.ceil(totalCount / parseInt(limit.toString()));

    res.json({ services, totalCount, totalPages });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves one Service by its ID
 */
export const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = (await ServiceOffering.findById(req.params.id)).populate(
      SERVICE_POPULATION
    );

    if (!service) throw new NotFoundError("Service not found");
    return res.json(service);
  } catch (err) {
    next(err);
  }
};
