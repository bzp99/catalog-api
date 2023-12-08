import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const isBuildingBlocksArray = (value: any[]) => {
  for (const item of value) {
    if (
      typeof item !== "object" ||
      !item.buildingBlock ||
      !item.implementation
    ) {
      throw new Error("Invalid array item structure");
    }
  }

  return true;
};

export const isRolesAndRulesArray = (value: any[]) => {
  for (const item of value) {
    if (
      typeof item !== "object" ||
      !item.role ||
      !item.ruleId ||
      typeof item.values !== "object"
    ) {
      throw new Error("Invalid array item structure");
    }

    for (const key in item.values) {
      const val = item.values[key];
      if (
        typeof val !== "string" &&
        typeof val !== "number" &&
        !(val instanceof Date)
      ) {
        throw new Error("Invalid value type in item.value");
      }
    }
  }

  return true;
};

export const isParticipantRolesArray = (value: any[]) => {
  for (const item of value) {
    if (
      typeof item !== "object" ||
      !item.participantId ||
      !Array.isArray(item.roles)
    ) {
      throw new Error("Invalid array item structure");
    }
  }

  return true;
};

export const isEcosystemOfferingPolicyArray = (value: any[]) => {
  for (const item of value) {
    if (
      typeof item !== "object" ||
      !item.serviceOffering ||
      typeof item?.values !== "object"
    ) {
      throw new Error("Invalid array item structure");
    }

    isPolicyArray(item.policy);
  }

  return true;
};

export const isPolicyArray = (value: any[]) => {
  for (const policy of value) {
    if (
      typeof policy !== "object" ||
      !policy.ruleId ||
      typeof policy?.values !== "object"
    ) {
      throw new Error("Invalid array policy structure");
    }
  }

  return true;
};

/**
 * Checks the validation pipeline of express-validator
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  } else {
    next();
  }
};
