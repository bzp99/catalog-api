import { NextFunction, Request, Response } from "express";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";
import { ECOSYSTEM_POPULATION } from "../../utils/schemaPopulation";
import { IServiceOffering } from "../../types/models";
import { Types } from "mongoose";
import ServiceOffering from "../../models/ServiceOffering/ServiceOffering.model";
import { serviceToSelfDescription } from "../../utils/selfDescriptions";

/**
 * Retrieves all of the service offerings
 * of the current participant
 */
export const getMyServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedParticipantId = req.user?.id;

    const services = await ServiceOffering.find({
      offeredBy: authenticatedParticipantId,
    });

    res.json(services);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new service offering for the
 * authenticated participant
 */
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serviceData: IServiceOffering = req.body;
    const participantId = req.user?.id;

    serviceData.offeredBy.push(new Types.ObjectId(participantId));

    const newService = new ServiceOffering(serviceData);

    newService.jsonld = serviceToSelfDescription(newService as any);

    const createdService = await newService.save();

    res.status(201).json(createdService);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a service
 */
export const updateServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedService = await ServiceOffering.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    ).populate(ECOSYSTEM_POPULATION);

    updatedService.jsonld = serviceToSelfDescription(updatedService as any);

    const final = await updatedService.save();

    res.json(final);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a service offering
 *
 * @todo Should we actually delete or have it update the SD lifecycle ?
 * What would happen if this data is already in use somewhere ?
 */
export const deleteServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const participantId = req.user?.id;

    const deleted = await ServiceOffering.findByIdAndDelete(id);

    await Ecosystem.updateMany(
      {
        "rolesAndResponsibilities.stakeholders.organisation": participantId,
      },
      {
        $pull: {
          "rolesAndResponsibilities.$.stakeholders.serviceOfferings": id,
        },
      }
    );

    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
