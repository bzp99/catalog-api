import { NextFunction, Request, Response } from "express";
import {
  DataResource,
  Ecosystem,
  InfrastructureService,
  ServiceOffering,
  SoftwareResource,
} from "../models";

export const isServiceOfferingUpdateAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = req.user.id;

    if (participant) {
      const so = await ServiceOffering.findOne({
        _id: req.params.id,
        providedBy: participant,
      });

      if (!so) {
        return res.status(403).json({
          code: 403,
          errorMsg: "Cannot update service offering",
          message: "Cannot update service offering",
        });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const isInfrastructureServiceUpdateAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = req.user.id;

    if (participant) {
      const so = await InfrastructureService.findOne({
        _id: req.params.id,
        providedBy: participant,
      });

      if (!so) {
        return res.status(403).json({
          code: 403,
          errorMsg: "Cannot update infrastructure service",
          message: "Cannot update infrastructure service",
        });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const isEcosystemUpdateAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = req.user.id;

    if (participant) {
      const so = await Ecosystem.findOne({
        _id: req.params.id,
        orchestrator: participant,
      });

      if (!so) {
        return res.status(403).json({
          code: 403,
          errorMsg: "Cannot update service offering",
          message: "Cannot update service offering",
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const isDataResourceUpdateAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = req.user.id;
    if (participant) {
      const so = await DataResource.findOne({
        _id: req.params.id,
        producedBy: participant,
      });

      if (!so) {
        return res.status(403).json({
          code: 403,
          errorMsg: "Cannot update service offering",
          message: "Cannot update service offering",
        });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const isSoftwareResourceUpdateAllowed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participant = req.user.id;

    if (participant) {
      const so = await SoftwareResource.findOne({
        _id: req.params.id,
        providedBy: participant,
      });

      if (!so) {
        return res.status(403).json({
          code: 403,
          errorMsg: "Cannot update service offering",
          message: "Cannot update service offering",
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
