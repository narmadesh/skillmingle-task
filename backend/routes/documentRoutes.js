import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router
  .route("")
  .get(protect, getDocuments)
  .post(protect, createDocument)
  .delete(protect, deleteDocument);

export default router;
