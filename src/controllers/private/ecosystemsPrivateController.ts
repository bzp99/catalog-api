import { NextFunction, Request, Response } from "express";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";
import { ECOSYSTEM_POPULATION } from "../../utils/schemaPopulation";
import { IEcosystem } from "../../types/models";
import { Types } from "mongoose";
import { ecosystemToSelfDescription } from "../../utils/selfDescriptions";

/**
 * Retrieves all of the ecosystems of the
 * authenticated user
 */
export const getMyEcosystems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedParticipantId = req.participant?.id;
    let filter = req.query.filter;

    // Set the default filter to "all" if no filter is specified
    if (filter === "orchestrator") {
      filter = {
        role: "Orchestrator",
      };
    } else if (filter === "member") {
      filter = {
        role: { $ne: "Orchestrator" },
      };
    } else {
      filter = "all";
    }

    // Query the ecosystems collection based on the filter
    let query: object = {
      "rolesAndResponsibilities.stakeholders.organisation":
        authenticatedParticipantId,
    };
    if (filter !== "all") {
      query = {
        ...query,
        "rolesAndResponsibilities.stakeholders.role": (
          filter as { role: string }
        ).role,
      };
    }

    const ecosystems = await Ecosystem.find(query).populate(
      ECOSYSTEM_POPULATION
    );

    res.json(ecosystems);
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves an ecosystem by id, if the
 * authenticated participant is a stakeholder of it
 */
export const getMyEcosystemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedParticipantId = req.participant?.id;

    const ecosystems = await Ecosystem.findOne({
      id: req.params.id,
      "rolesAndResponsibilities.stakeholders.organisation":
        authenticatedParticipantId,
    }).populate(ECOSYSTEM_POPULATION);

    res.json(ecosystems);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new ecosystem by setting the authenticated user
 * as orchestrator of this ecosystem
 */
export const createEcosystem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ecosystemData: IEcosystem = req.body;
    const orchestratorId = req.participant?.id;

    ecosystemData.rolesAndResponsibilities.stakeholders.push({
      organisation: new Types.ObjectId(orchestratorId),
      role: "Orchestrator",
      dataOfferings: [],
      serviceOfferings: [],
    });

    const newEcosystem = new Ecosystem(ecosystemData);

    newEcosystem.jsonld = ecosystemToSelfDescription(newEcosystem as any);

    const createdEcosystem = await newEcosystem.save();

    res.status(201).json(createdEcosystem);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates an ecosystem
 */
export const updateEcosystemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEcosystem = await Ecosystem.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    ).populate(ECOSYSTEM_POPULATION);

    res.json(updatedEcosystem);
  } catch (err) {
    next(err);
  }
};
