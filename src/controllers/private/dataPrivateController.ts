import { NextFunction, Request, Response } from "express";
import Ecosystem from "../../models/Ecosystem/Ecosystem.model";
import { DATA_OFFERING_POPULATION } from "../../utils/schemaPopulation";
import { IDataOffering } from "../../types/models";
import { Types } from "mongoose";
import DataOffering from "../../models/DataOffering/DataOffering.model";
import { dataOfferingToSelfDescription } from "../../utils/selfDescriptions";

/**
 * Retrieves all of the data offerings
 * of the current participant
 */
export const getMyDataOfferings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedParticipantId = req.user?.id;

    const data = await DataOffering.find({
      offeredBy: authenticatedParticipantId,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new data offering for the
 * authenticated participant
 */
export const createDataOffering = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IDataOffering = req.body;
    const participantId = req.user?.id;

    data.offeredBy.push(new Types.ObjectId(participantId));

    const newData = new DataOffering(data);

    newData.jsonld = dataOfferingToSelfDescription(newData as any);

    const created = await newData.save();

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a data offering
 */
export const updateDataOfferingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updated = await DataOffering.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate(DATA_OFFERING_POPULATION);

    updated.jsonld = dataOfferingToSelfDescription(updated as any);

    const final = await updated.save();

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
export const deleteDataOfferingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const participantId = req.user?.id;

    const deleted = await DataOffering.findByIdAndDelete(id);

    await Ecosystem.updateMany(
      {
        "rolesAndResponsibilities.stakeholders.organisation": participantId,
      },
      {
        $pull: {
          "rolesAndResponsibilities.$.stakeholders.dataOfferings": id,
        },
      }
    );

    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
