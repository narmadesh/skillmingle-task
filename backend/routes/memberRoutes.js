import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createMember, deleteMember, getMembers, memberDetail, updateMember } from "../controllers/memberController.js";

const router = express.Router();

router.route("/teams/:id").get(protect, getMembers);
router.route("/:id").get(protect, memberDetail);
router.route("").post(protect, createMember).put(protect, updateMember).delete(protect, deleteMember);

export default router;
