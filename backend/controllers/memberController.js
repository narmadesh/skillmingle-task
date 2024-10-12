import asyncHandler from "express-async-handler";
import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

// @desc    Get members
// @route   GET /api/members/teams/:id
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
  const members = await User.find({ teams: req.params.id });

  if (members) {
    res.status(200).json(members);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc    Detail member
// @route   GET /api/members/:id
// @access  Public
const memberDetail = asyncHandler(async (req, res) => {
  const member = await User.findById(req.params.id);

  if (member) {
    res.status(200).json(member);
  } else {
    res.status(400);
    throw new Error("Member not found");
  }
});

// @desc    Create member
// @route   POST /api/members
// @access  Public
const createMember = asyncHandler(async (req, res) => {
  const member = await User.create(req.body);
  const team = await Team.findById(req.body.team);
  if (member) {
    team.users.push(member);
    await team.save();
    res.status(201).json(member);
  } else {
    res.status(400);
    throw new Error("Invalid member data");
  }
});

// @desc    Update member
// @route   PUT /api/members
// @access  Public
const updateMember = asyncHandler(async (req, res) => {
  const member = await User.findById(req.body.id);

  if (member) {
    member.name = req.body.name || member.name;
    member.email = req.body.email || member.email;
    if (req.body.password) {
      member.password = req.body.password;
    }

    const update = await member.save();

    res.json(update);
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
});

// @desc    Delete team
// @route   DELETE /api/members
// @access  Public
const deleteMember = asyncHandler(async (req, res) => {
  const member = await User.deleteOne({ _id: req.body.id });

  if (member) {
    res.status(201).json({ message: "Member deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Member not found");
  }
});

export { getMembers, memberDetail, createMember, updateMember, deleteMember };
