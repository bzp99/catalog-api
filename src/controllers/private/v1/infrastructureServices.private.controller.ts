import { NextFunction, Request, Response } from "express";
import { InfrastructureService } from "../../../models";
import { serviceOfferingPopulation } from "../../../utils/schemaPopulation";
import { IInfrastructureService } from "../../../types/infrastructureservice";

const DEFAULT_QUERY_OPTIONS = {
  page: 0,
  limit: 50,
};

/**
 * Creates a new infrastructure service
 */
export const createInfrastructureService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const infrastructureService = new InfrastructureService({
      ...req.body,
      providedBy: req.user.id,
    });

    await infrastructureService.save();

    return res.status(201).json(infrastructureService);
  } catch (err) {
    next(err);
  }
};

export const createDraftInfrastructureService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const infrastructureService = new InfrastructureService({
      ...req.body,
      status: "draft",
      providedBy: req.user.id,
    });

    await infrastructureService.save();

    return res.status(201).json(infrastructureService);
  } catch (err) {
    next(err);
  }
};

/**
 * Returns the infrastructure services for a specific participant
 */
export const getInfrastructureServicesForParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = await getParticipantInfrastructureServices({
      req,
      res,
      participantId: req.params.id,
    });
    return res.status(200).json(payload.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets all infrastructure services of the authenticated participant
 */
export const getSessionParticipantInfrastructureService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = await getParticipantInfrastructureServices({
      req,
      res,
      participantId: req.user.id,
    });
    return res.status(200).json(payload.data);
  } catch (err) {
    next(err);
  }
};

export const updateInfrastructureService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const infrastructureService = await InfrastructureService.findById(id);

    // TODO check if this is still in use

    if (body.dataResources || body.softwareResources) {
      body.aggregationOf = [];

      if (body?.dataResources?.length > 0) {
        for (const dr of body.dataResources) {
          body.aggregationOf.push(
            `${process.env.API_URL}/catalog/dataresources/${dr}`
          );
        }
      }
      if (body?.softwareResources?.length > 0) {
        for (const sr of body.softwareResources) {
          body.aggregationOf.push(
            `${process.env.API_URL}/catalog/softwareresources/${sr}`
          );
        }
      }
    }

    const updatedInfrastructureService =
      await InfrastructureService.findByIdAndUpdate(id, {
        new: true,
        runValidators: true,
      });

    if (!updatedInfrastructureService) {
      return res.json({
        code: 404,
        errorMsg: "Infrastructure Service not found",
        message: "InfrastructureServicesService.updateInfrastructureService",
      });
    }

    return res.status(200).json({
      ...infrastructureService,
      progress: getCompletionDetails(infrastructureService),
    });
  } catch (err) {
    next(err);
  }
};

export const deleteInfrastructureService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const infrastructureService = await InfrastructureService.findByIdAndDelete(
      req.params.id
    );
    if (!infrastructureService) {
      return res.json({
        code: 404,
        errorMsg: "Resource not found",
        message: "The infrastructure service could not be found",
      });
    }

    return res.status(204).json(infrastructureService);
  } catch (err) {
    next(err);
  }
};

const getParticipantInfrastructureServices = async ({
  req,
  res,
  participantId,
}: {
  req: Request;
  res: Response;
  participantId: string;
}) => {
  const { limit, page, populated } = req.query;

  const queryOptions = {
    ...DEFAULT_QUERY_OPTIONS,
    limit: parseInt(limit?.toString()) || 0,
    page: parseInt(page?.toString()) || 0,
  };

  const query = { providedBy: participantId };
  const queryBuilder =
    populated === "true"
      ? InfrastructureService.find(query).populate(serviceOfferingPopulation)
      : InfrastructureService.find(query);

  const [infrastructureServices, count] = await Promise.all([
    queryBuilder
      .limit(queryOptions.limit)
      .skip(queryOptions.page * queryOptions.limit),
    InfrastructureService.countDocuments(query),
  ]);

  const sos = infrastructureServices.map((so) => ({
    ...so.toObject(),
    progress: getCompletionDetails(so),
    completion: validateInfrastructureServiceCompletion(so),
  }));

  return {
    req,
    res,
    code: 200 as any,
    data: {
      limit: queryOptions.limit,
      page: queryOptions.page,
      pages:
        count / queryOptions.limit < 1
          ? 1
          : Math.ceil(count / queryOptions.limit),
      count,
      result: sos,
    },
  };
};

export const validateInfrastructureServiceCompletion = (
  offering: IInfrastructureService
) => {
  const requiredFields = [
    "name",
    "description",
    "policy",
    "location",
    "configParameters",
    "inputFormat",
    "outputFormat",
  ];

  const total = requiredFields.length + 1; // Adding 1 here as the completion is taking into account either data or software resources presence
  let count = 0;

  if (offering.name) count++;
  if (offering.description) count++;
  if (offering.policy.length > 0) count++;
  if (offering.location) count++;
  if (offering.params?.length > 0) count++;
  if (offering.inputFormat) count++;
  if (offering.outputFormat) count++;

  if (
    offering.dataResources.length > 0 ||
    offering.softwareResources.length > 0
  )
    count++;

  const percentage = Math.floor((count / total) * 100);

  return {
    percentage: percentage > 100 ? 100 : percentage,
    isComplete: percentage >= 100,
  };
};

export const getCompletionDetails = (offering: IInfrastructureService) => {
  const completion: { [K in keyof Partial<IInfrastructureService>]: boolean } =
    {
      policy: offering.policy.length > 0,
      location: !!offering.location,
      name: !!offering.name,
    };

  let okayish = false;
  const baseAllOk = Object.values(completion).every((v) => v);
  if (
    (offering.dataResources.length > 0 ||
      offering.softwareResources.length > 0) &&
    baseAllOk
  ) {
    okayish = true;
  }

  completion.dataResources = offering.dataResources.length > 0;
  completion.softwareResources = offering.softwareResources.length > 0;
  completion.description = !!offering.description;

  const allOk = Object.values(completion).every((v) => v);
  return {
    ...completion,
    okayish,
    allOk,
  };
};
