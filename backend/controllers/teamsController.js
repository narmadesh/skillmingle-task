import asyncHandler from "express-async-handler";
import Team from "../models/teamModel.js";

// @desc    Get teams
// @route   GET /api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();

  if (teams) {
    res.status(200).json(teams);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc    Detail team
// @route   GET /api/teams/:id
// @access  Public
const teamDetail = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id).populate('users');

  if (team) {
    res.status(200).json(team);
  } else {
    res.status(400);
    throw new Error("Invalid team data");
  }
});

// @desc    Create team
// @route   POST /api/teams
// @access  Public
const createTeam = asyncHandler(async (req, res) => {
  const team = await Team.create(req.body);

  if (team) {
    res.status(201).json(team);
  } else {
    res.status(400);
    throw new Error("Invalid team data");
  }
});

// @desc    Update team
// @route   PUT /api/teams
// @access  Public
const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.body.id);

  if (team) {
    team.name = req.body.name || team.name;

    const update = await team.save();

    res.json(update);
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

// @desc    Delete team
// @route   DELETE /api/teams
// @access  Public
const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.deleteOne({ _id: req.body.id });

  if (team) {
    res.status(201).json({ message: "Team deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid team data");
  }
});

export { getTeams, teamDetail, createTeam, updateTeam, deleteTeam };
