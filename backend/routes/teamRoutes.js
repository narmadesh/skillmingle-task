import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createTeam,
  deleteTeam,
  getTeams,
  teamDetail,
  updateTeam,
} from "../controllers/teamsController.js";

const router = express.Router();

router
  .route("")
  .get(protect, getTeams)
  .post(protect, createTeam)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

router.route("/:id").get(protect, teamDetail);

export default router;
