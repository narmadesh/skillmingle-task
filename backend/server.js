import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';

const port = process.env.PORT || 5000;

connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(
  fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})
);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/todos", todoRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
