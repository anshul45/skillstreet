import dotenv from "dotenv";

import { db } from "./db/connect.js";
import app from "./app.js";

dotenv.config();

const port = 3001;

app.listen(port, () => {
  console.log("listening on port " + port);
  db();
});
