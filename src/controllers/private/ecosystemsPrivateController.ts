import { NextFunction, Request, Response } from "express";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";
import { ECOSYSTEM_POPULATION } from "../../utils/schemaPopulation";
import { FederatedIdentifier, IEcosystem } from "../../types/models";
import { Types } from "mongoose";
import { ecosystemToSelfDescription } from "../../utils/selfDescriptions";
import EcosystemAccessRequest from "../../models/EcosystemAccessRequest/EcosystemAccessRequest.model";
import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";

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
    const authenticatedParticipantId = req.user?.id;
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
    const authenticatedParticipantId = req.user?.id;

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
    const orchestratorId = req.user?.id;

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

    updatedEcosystem.jsonld = ecosystemToSelfDescription(
      updatedEcosystem as any
    );

    const final = await updatedEcosystem.save();

    res.json(final);
  } catch (err) {
    next(err);
  }
};

/**
 * Processes an access request to an ecosystem
 */
export const processAccessRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ecosystem, participant, role } = req.body as {
      ecosystem: FederatedIdentifier;
      participant: FederatedIdentifier & { role: string };
      role: string;
    };

    const user = req.user.populated;
    const userFederatedIdentifier = {
      id: user.id,
      identifier: user.identifier,
    };

    let ar;
    if (ecosystem && participant) {
      ar = await EcosystemAccessRequest.invite(
        participant,
        ecosystem,
        userFederatedIdentifier
      );
    } else {
      ar = await EcosystemAccessRequest.request(
        { ...userFederatedIdentifier, role },
        ecosystem
      );
    }

    return res.json(ar);
  } catch (err) {
    next(err);
  }
};

/**
 * Processes an access request update
 * may it be an authorization or revocation
 */
export const updateAccessRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, action } = req.body;
    const possible_actions = ["accept", "revoke"];
    if (!possible_actions.includes(action)) {
      throw new BadRequestError("Invalid action", [
        {
          field: "action",
          message:
            "action parameter should be one of the following: accept | revoke",
        },
      ]);
    }
    const user = req.user.populated;
    const userFederatedIdentifier = {
      id: user.id,
      identifier: user.identifier,
    };

    const ar = await EcosystemAccessRequest.findById(id);
    if (!ar) throw new NotFoundError("Could not find access request");

    const eco = await Ecosystem.findOne({
      id: ar.ecosystem.id,
      identifier: ar.ecosystem.identifier,
    });
    if (!eco) throw new NotFoundError("Could not find ecosystem");

    const userRole = eco.rolesAndResponsibilities.stakeholders.find(
      (s) => s.organisation.toString() === user.id
    );

    switch (action) {
      case "accept":
        if (ar.isInvitation) {
          if (
            ar.joining.id !== user.id ||
            ar.joining.identifier !== user.identifier
          )
            throw new ForbiddenError(
              "You are not authorized to accept this invitation"
            );
        } else {
          if (
            ar.joining.id === user.id ||
            ar.joining.identifier === user.identifier
          ) {
            throw new ForbiddenError(
              "You are not authorized to accept this access request"
            );
          }

          // Verify the role of the current user in the ecosystem
          if (!userRole)
            throw new ForbiddenError(
              "You are not authorized to update access requests to this ecosystem"
            );

          ar.authorizedBy = userFederatedIdentifier;
        }

        ar.status = "AUTHORIZED";
        eco.rolesAndResponsibilities.stakeholders.push({
          organisation: ar.joining.id,
          role: ar.joining.role,
          dataOfferings: [],
          serviceOfferings: [],
        });
        break;

      case "revoke":
        // Check if revocation is coming from participant or orchestrator
        // TODO Find a better way to do this
        if (
          !userRole.role.toLocaleLowerCase().includes("orchestrator") ||
          (!userRole && ar.joining.id === user.id)
        ) {
          ar.status = "REVOKED";
          ar.revokedBy = userFederatedIdentifier;
          eco.rolesAndResponsibilities.stakeholders =
            eco.rolesAndResponsibilities.stakeholders.filter(
              (s) => s.organisation.toString() !== user.id
            );
        } else {
          throw new ForbiddenError(
            "You are not authorized to revoke this access request"
          );
        }
        break;

      default:
        break;
    }

    await Promise.all([ar.save(), eco.save()]);

    return res.json(ar);
  } catch (err) {
    next(err);
  }
};
