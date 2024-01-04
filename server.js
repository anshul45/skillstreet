import dotenv from "dotenv";
import { db } from "./db/connect.js";
import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/", notesRouter);
app.use("/api/auth/", userRouter);

dotenv.config();

const port = 3001;

app.listen(port, () => {
  console.log("listening on port " + port);
  db();
});
