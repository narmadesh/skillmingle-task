import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Todo from "../models/todoModel.js";

// @desc    Get todo
// @route   GET /api/todo
// @access  Public
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id.toHexString() });

  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(400);
    throw new Error("Todos not found");
  }
});

// @desc    Detail todo
// @route   GET /api/todo/:id
// @access  Public
const detailTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(400);
    throw new Error("Todonot found");
  }
});

// @desc    Create todo
// @route   POST /api/todo
// @access  Public
const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({
    title:req.body.title,
    task:req.body.task,
    user:req.user._id
  });
  const user = await User.findById(req.user._id);
  if (todo) {
    user.todos.push(todo);
    await user.save();
    res.status(201).json(todo);
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

// @desc    Update todo
// @route   POST /api/todo
// @access  Public
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  if (todo) {
    todo.title = req.body.title || todo.title;
    todo.task = req.body.task || todo.task;
    todo.save();
    res.status(201).json(todo);
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

// @desc    Delete todos
// @route   DELETE /api/todos
// @access  Public
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  if (todo) {
    const user = await User.findById(req.user._id);
    user.todos.pop(todo);
    user.save();
    await Todo.deleteOne({ _id: req.body.id });
    res.status(201).json({ message: "Todo deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Todo not found");
  }
});

export { getTodos,detailTodo, createTodo, updateTodo, deleteTodo };
