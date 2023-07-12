import { NextFunction, Request, Response } from "express";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";
import { ECOSYSTEM_POPULATION } from "../../utils/schemaPopulation";
import { NotFoundError } from "../../errors/NotFoundError";

/**
 * Retrieves Ecosystems. Uses pagination
 */
export const getAllEcosystems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = "10", page = "1" } = req.query;

    // TODO Have more query filter options

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const ecosystems = await Ecosystem.find()
      .skip(skip)
      .limit(parseInt(limit.toString()))
      .populate(ECOSYSTEM_POPULATION);

    const totalCount = await Ecosystem.countDocuments();

    const totalPages = Math.ceil(totalCount / parseInt(limit.toString()));

    res.json({ ecosystems, totalCount, totalPages });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves one ecosystem by its ID
 */
export const getEcosystemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ecosystem = await Ecosystem.findById(req.params.id);

    if (!ecosystem) throw new NotFoundError("Ecosystem not found");
    return res.json(ecosystem);
  } catch (err) {
    next(err);
  }
};
