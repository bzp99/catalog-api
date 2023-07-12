import { NextFunction, Request, Response } from "express";
import Ecosystem from "../models/Ecosystem/Ecosystem.model";
import { ForbiddenError } from "../errors/ForbiddenError";

/**
 * Verifies that the authenticated participant
 * is an owner of the ecosystem it is trying to update
 * @author Felix Bole
 */
export const verifyEcosystemOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const participantId = req.participant?.id;

    const ecosystem = await Ecosystem.findOne({
      id,
      "rolesAndResponsibilities.stakeholders.organisation": participantId,
    });

    if (!ecosystem) {
      throw new ForbiddenError("You are not an orchestrator of this ecosystem");
    }

    req.ecosystem = ecosystem;
    next();
  } catch (err) {
    next(err);
  }
};
