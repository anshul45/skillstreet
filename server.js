import express from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notesRoutes.js";
import bodyParser from "body-parser";
import { db } from "./db/connect.js";

dotenv.config();

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use("/api/v1/", notesRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
  db();
});
