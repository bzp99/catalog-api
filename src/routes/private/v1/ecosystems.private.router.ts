import { Router } from "express";
import { verifyJwtMiddleware } from "../../../middleware/auth";
import { body } from "express-validator";
import {
  isBuildingBlocksArray,
  isEcosystemOfferingPolicyArray,
  isParticipantRolesArray,
  isRolesAndRulesArray,
  validate,
} from "../../../middleware/validator";
import {
  acceptInvitation,
  applyOrchestratorSignature,
  applyParticipantSignature,
  authorizeJoinRequest,
  configureParticipantEcosystemOfferings,
  createEcosystem,
  createEcosystemContract,
  createInvitation,
  createJoinRequest,
  deleteEcosystemById,
  denyInvitation,
  getAllInvitations,
  getEcosystemContract,
  getInvitations,
  getJoinRequests,
  getMyEcosystems,
  rejectJoinRequest,
  updateEcosystemById,
} from "../../../controllers/private/v1/ecosystems.private.controller";

const router: Router = Router();

router.use(verifyJwtMiddleware);

router.post(
  "/",
  [
    body("name", "Missing name").isString().notEmpty().exists().trim(),
    body("description", "Missing description")
      .isString()
      .notEmpty()
      .exists()
      .trim(),
    body("provides").isArray().notEmpty(),
    body("searchedDatatypes").exists().isArray(),
    body("searchedServices").exists().isArray(),
    body("useCases").exists().isArray(),
    body("businessLogic").optional().isObject(),
    body("rolesAndObligations").optional().isArray(),
  ],
  validate,
  createEcosystem
);

router.get("/me/invites", getAllInvitations);
router.get("/me", getMyEcosystems);

router.get("/:id/invites", getInvitations);
router.post(
  "/:id/invites",
  [
    body("roles", "roles should be a string array")
      .isArray()
      .notEmpty()
      .exists(),
    body("participantId").isString().exists().notEmpty().trim(),
  ],
  validate,
  createInvitation
);
router.post("/:id/invites/accept", acceptInvitation);
router.post("/:id/invites/deny", denyInvitation);

router.get("/:id/requests", getJoinRequests);
router.post(
  "/:id/requests",
  [
    body("roles", "roles should be a string array")
      .isArray()
      .notEmpty()
      .exists(),
    body("offerings", "policies are not in the right format")
      .optional()
      .custom(isEcosystemOfferingPolicyArray),
  ],
  validate,
  createJoinRequest
);
router.put("/:id/requests/:requestId/authorize", authorizeJoinRequest);
router.put("/:id/requests/:requestId/reject", rejectJoinRequest);

router.put(
  "/:id/offerings",
  [
    body("offerings", "policies are not in the right format")
      .exists()
      .custom(isEcosystemOfferingPolicyArray),
  ],
  validate,
  configureParticipantEcosystemOfferings
);

router.put(
  "/:id",
  [
    body("name").isString(),
    body("description").isString(),
    body("location").isString(),
    body("country_or_region").optional().isString(),
    body("target_audience").optional().isString(),
    body("main_functionalities_needed").optional().isArray(),
    body("logo").optional().isString(),
    body("useCases").optional().isArray(),
    body("searchedServices").optional().isArray(),
    body("searchedDatatypes").optional().isArray(),
    body("provides").optional().isArray().notEmpty(),
    body("businessLogic").optional().isObject(),
    body("buildingBlocks").optional().isArray().custom(isBuildingBlocksArray),
    body("rolesAndObligations")
      .optional()
      .isArray()
      .custom(isRolesAndRulesArray),
    body("participantRoles")
      .optional()
      .isArray()
      .custom(isParticipantRolesArray),
    body("contract").optional().isString(),
  ],
  updateEcosystemById
);
router.delete("/:id", deleteEcosystemById);

router.post("/:id/contract", createEcosystemContract);

router.get("/:id/contract", getEcosystemContract);

router.post(
  "/:id/signature/orchestrator",
  [body("signature").isString().exists().notEmpty().trim()],
  validate,
  applyOrchestratorSignature
);

router.post(
  "/:id/signature/participant",
  [body("signature").isString().exists().notEmpty().trim()],
  validate,
  applyParticipantSignature
);

export default router;
