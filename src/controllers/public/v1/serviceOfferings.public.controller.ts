import { NextFunction, Request, Response } from "express";
import { ServiceOffering } from "../../../models";
import { serviceOfferingPopulation } from "../../../utils/schemaPopulation";
import { mapCatalog, mapServiceOffering } from "../../../libs/dcat";
import { ResourceTypes } from "../../../libs/dcat/types";

const DEFAULT_QUERY_OPTIONS = {
  page: 0,
  limit: 50,
};

/**
 * Returns all service offerings with pagination
 */
export const getServiceOfferings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page, providedBy } = req.query;
    const queryOptions: {
      limit: number;
      page: number;
      providedBy?: string;
    } = {
      ...DEFAULT_QUERY_OPTIONS,
      limit: parseInt(limit?.toString()) || 0,
      page: parseInt(page?.toString()) || 0,
      providedBy: providedBy?.toString() || "",
    };

    let countQuery = ServiceOffering.count();
    let query = ServiceOffering.find();

    if (queryOptions.providedBy) {
      countQuery = query.count({ providedBy: queryOptions.providedBy });
      query = query.where("providedBy").equals(queryOptions.providedBy);
    }

    const [serviceOfferings, count] = await Promise.all([
      query
        .limit(queryOptions?.limit)
        .skip(queryOptions?.page * queryOptions?.limit),
      countQuery,
    ]);

    return res.json({
      code: 200,
      data: {
        limit: queryOptions.limit,
        page: queryOptions.page,
        pages:
          count / queryOptions.limit < 1
            ? 1
            : Math.ceil(count / queryOptions.limit),
        count,
        result: serviceOfferings,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Returns the service offering using its ID
 */
export const getServiceOfferingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { populated } = req.query;

    let serviceOffering;

    if (populated && populated === "true") {
      serviceOffering = await ServiceOffering.findById(req.params.id)
        .populate(serviceOfferingPopulation)
        .lean();
    } else {
      serviceOffering = await ServiceOffering.findById(req.params.id).lean();
    }

    if (!serviceOffering) {
      return res.status(404).json({
        code: 404,
        errorMsg: "Resource not found",
        message: "The service offering could not be found",
      });
    }

    return res.json(serviceOffering);
  } catch (err) {
    next(err);
  }
};

export const getDCATServiceOfferingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { populated } = req.query;

    let serviceOffering;

    if (populated && populated === "true") {
      serviceOffering = await ServiceOffering.findById(req.params.id)
        .populate(serviceOfferingPopulation)
        .lean();
    } else {
      serviceOffering = await ServiceOffering.findById(req.params.id).lean();
    }

    if (!serviceOffering) {
      return res.status(404).json({
        code: 404,
        errorMsg: "Resource not found",
        message: "The service offering could not be found",
      });
    }

    return res.json(
      mapServiceOffering({
        ...serviceOffering,
        _id: serviceOffering._id.toString(),
      })
    );
  } catch (err) {
    next(err);
  }
};

export const getDCATServiceOfferings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page, providedBy } = req.query;
    const queryOptions: {
      limit: number;
      page: number;
      providedBy?: string;
    } = {
      ...DEFAULT_QUERY_OPTIONS,
      limit: parseInt(limit?.toString()) || 0,
      page: parseInt(page?.toString()) || 0,
      providedBy: providedBy?.toString() || "",
    };

    let countQuery = ServiceOffering.count();
    let query = ServiceOffering.find();

    if (queryOptions.providedBy) {
      countQuery = query.count({ providedBy: queryOptions.providedBy });
      query = query.where("providedBy").equals(queryOptions.providedBy);
    }

    const [serviceOfferings, count] = await Promise.all([
      query
        .limit(queryOptions?.limit)
        .skip(queryOptions?.page * queryOptions?.limit),
      countQuery,
    ]);

    return res.json({
      code: 200,
      data: {
        limit: queryOptions.limit,
        page: queryOptions.page,
        pages:
          count / queryOptions.limit < 1
            ? 1
            : Math.ceil(count / queryOptions.limit),
        count,
        result: mapCatalog(
          serviceOfferings,
          {
            title: "ServiceOffering",
            description: "ServiceOffering DCAT Catalog",
          },
          ResourceTypes.DataResource
        ),
      },
    });
  } catch (err) {
    next(err);
  }
};
