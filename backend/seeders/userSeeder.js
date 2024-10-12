import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "../config/db.js";

connectDB();
const userSeeder = async () => {
  const userExists = await User.findOne({ email: "admin@email.com" });

  if (userExists) {
    process.exit();
  }

  const user = await User.create({
    name: "Admin",
    email: "admin@email.com",
    password: "admin123",
    role:"admin"
  });

  if (user) {
    process.exit();
  } else {
    process.exit(1);
  }
};

userSeeder();
