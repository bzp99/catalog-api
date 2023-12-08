import { Request, Response, NextFunction } from "express";
import { Ecosystem, ServiceOffering } from "../../../models";
import { HydratedDocument } from "mongoose";
import { IDataResource } from "../../../types/dataresource";
import { ISoftwareResource } from "../../../types/softwareresource";

export const ECOSYSTEM_PARTICIPANT_POPULATION = [
  {
    path: "participant",
    model: "Participant",
  },
];

export const ECOSYSTEM_POPULATION = [
  {
    path: "orchestrator",
    model: "Participant",
  },
  {
    path: "participants",
    populate: ECOSYSTEM_PARTICIPANT_POPULATION,
  },
  {
    path: "joinRequests",
    populate: ECOSYSTEM_PARTICIPANT_POPULATION,
  },
  {
    path: "invitations",
    populate: ECOSYSTEM_PARTICIPANT_POPULATION,
  },
  "useCases",
];

/**
 * Gets all ecosystems
 * @author Felix Bole
 */
export const getEcosystems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit } = req.query;
    const finalLimit = limit ? parseInt(limit.toString()) : 50;

    const ecosystems = await Ecosystem.find()
      .sort({ createdAt: -1 })
      .populate(ECOSYSTEM_POPULATION)
      .limit(finalLimit);

    res.status(200).json(ecosystems);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets a single ecosystem by ID
 */
export const getEcosystemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ecosystem = await Ecosystem.findById(req.params.id).populate(
      ECOSYSTEM_POPULATION
    );
    if (!ecosystem) {
      return res.status(404).json({ message: "Ecosystem not found" });
    }
    res.status(200).json(ecosystem);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets ecosystems for a single participant
 */
export const getParticipantEcosystems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { populated } = req.query;

    const query = {
      $or: [{ orchestrator: id }, { "participants.organization": { $in: id } }],
    };
    const queryBuilder =
      populated === "true"
        ? Ecosystem.find(query).populate(ECOSYSTEM_POPULATION)
        : Ecosystem.find(query);

    const ecosystems = await queryBuilder;

    return res.json(ecosystems);
  } catch (err) {
    next(err);
  }
};

/**
 * Finds the GlobalDatatypes and GlobalPurposes used by organizations
 * in the ecosystem
 * @author Felix Bole
 */
export const getCirculatingResourcesInEcosystem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ecosystem = await Ecosystem.findById(id).lean();
    const participantsInEcosystem = ecosystem.participants.map(
      (p) => p.participant
    );

    const serviceOfferings = await ServiceOffering.find({
      providedBy: { $in: participantsInEcosystem },
    }).populate<{
      dataResources: HydratedDocument<IDataResource>[];
      softwareResources: HydratedDocument<ISoftwareResource>[];
    }>([
      {
        path: "dataResources",
        model: "DataResource",
      },
      {
        path: "softwareResources",
        model: "SoftwareResource",
      },
    ]);

    const usedCategories: {
      data: string[];
      services: string[];
    } = {
      data: [],
      services: [],
    };

    serviceOfferings.forEach((offering) => {
      usedCategories.data.push(
        ...offering.dataResources.map((resource) => resource.category)
      );

      usedCategories.services.push(
        ...offering.softwareResources.map((resource) => resource.category)
      );
    });

    // Deduplicate categories
    usedCategories.data = Array.from(new Set(usedCategories.data));
    usedCategories.services = Array.from(new Set(usedCategories.services));

    const finalOutput = {
      data: usedCategories.data,
      services: usedCategories.services,
    };

    return res.json({
      code: 200,
      data: finalOutput,
    });
  } catch (err) {
    next(err);
  }
};
