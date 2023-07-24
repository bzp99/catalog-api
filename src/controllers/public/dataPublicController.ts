import { NextFunction, Request, Response } from "express";
import {
  DATA_OFFERING_POPULATION,
  SERVICE_POPULATION,
} from "../../utils/schemaPopulation";
import { NotFoundError } from "../../errors/NotFoundError";
import DataOffering from "../../models/DataOffering/DataOffering.model";

/**
 * Retrieves Data offerings. Uses pagination
 */
export const getAllDataOfferings = async (
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

    const data = await DataOffering.find(query)
      .skip(skip)
      .limit(parseInt(limit.toString()))
      .populate(SERVICE_POPULATION);

    const totalCount = await DataOffering.countDocuments();

    const totalPages = Math.ceil(totalCount / parseInt(limit.toString()));

    res.json({ data, totalCount, totalPages });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves one Service by its ID
 */
export const getDataOfferingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = (await DataOffering.findById(req.params.id)).populate(
      DATA_OFFERING_POPULATION
    );

    if (!data) throw new NotFoundError("data not found");
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
