import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createTodo,
  deleteTodo,
  detailTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/:id").get(protect, detailTodo);
router
  .route("")
  .get(protect, getTodos)
  .post(protect, createTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
