import jwt from "jsonwebtoken";
import { IParticipant } from "../../types/participant";
import { HydratedDocument } from "mongoose";
import { CONFIG } from "../../config/environment";

export const issueJwt = (participant: HydratedDocument<IParticipant>) => {
  const jwtPayload = {
    sub: participant.id,
    participant_name: participant.legalName,
    serviceKey: participant.serviceKey,
  };

  const jwtOptions: jwt.SignOptions = {
    expiresIn: "1h",
  };

  const token = jwt.sign(jwtPayload, CONFIG.jwtSecretKey, jwtOptions);
  return token;
};
