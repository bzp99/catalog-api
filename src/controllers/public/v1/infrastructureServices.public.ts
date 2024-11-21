import { NextFunction, Request, Response } from "express";
import {
  InfrastructureService,
  OrganizationAdmin,
  Participant,
} from "../../../models";
import { serviceOfferingPopulation } from "../../../utils/schemaPopulation";
import { getDocumentId } from "../../../utils/mongooseDocumentHelpers";
import {
  getCompletionDetails,
  validateInfrastructureServiceCompletion,
} from "../../private/v1/infrastructureServices.private.controller";

const DEFAULT_QUERY_OPTIONS = {
  page: 0,
  limit: 50,
};

/**
 * Returns all infrastructure services with pagination
 */
export const getInfrastructureServices = async (
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
      providedBy: providedBy?.toString() || undefined,
    };

    let countQuery = InfrastructureService.countDocuments();
    const query = providedBy ? { providedBy: queryOptions.providedBy } : {};

    let contactInfo:
      | Awaited<ReturnType<typeof getParticipantContactInfo>>
      | undefined = undefined;

    if (queryOptions.providedBy) {
      countQuery = InfrastructureService.countDocuments(query);
      contactInfo = await getParticipantContactInfo(queryOptions.providedBy);
    }

    const [infrastructureServices, count] = await Promise.all([
      InfrastructureService.find(query)
        .limit(queryOptions?.limit)
        .skip(queryOptions?.page * queryOptions?.limit),
      countQuery,
    ]);

    const offers = providedBy
      ? infrastructureServices.map((infrastructureServices) => ({
          ...infrastructureServices.toObject(),
          contactInfo, // Add this if we know the providedBy
        }))
      : infrastructureServices;

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
        result: offers,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Returns the infrastructure service using its ID
 */
export const getInfrastructureServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { populated } = req.query;

    let infrastructureServices;

    if (populated && populated === "true") {
      infrastructureServices = await InfrastructureService.findById(
        req.params.id
      ).populate(serviceOfferingPopulation);
    } else {
      infrastructureServices = await InfrastructureService.findById(
        req.params.id
      );
    }

    if (!infrastructureServices) {
      return res.json({
        code: 404,
        errorMsg: "Resource not found",
        message: "The service offering could not be found",
      });
    }

    const contactInfo = await getParticipantContactInfo(
      getDocumentId(infrastructureServices.providedBy)
    );

    return res.status(200).json({
      ...infrastructureServices.toObject(),
      progress: getCompletionDetails(infrastructureServices),
      completion: validateInfrastructureServiceCompletion(
        infrastructureServices
      ),
      contactInfo,
    });
  } catch (err) {
    next(err);
  }
};

const getParticipantContactInfo = async (participantId: string) => {
  const contactInfo: {
    firstName?: string;
    lastName?: string;
    email: string;
  } = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const participant = await Participant.findById(participantId);

  if (!participant) return contactInfo;

  const admin = await OrganizationAdmin.findOne({
    organization: participant._id,
  });

  if (!admin) return contactInfo;

  contactInfo.email = admin.email;
  contactInfo.firstName = admin.firstName;
  contactInfo.lastName = admin.lastName;

  return contactInfo;
};
